class PanelController < ApplicationController
  before_action :authenticate_admin!
  before_action :select_set, only: [:principal, :index, :mostrar, :generar, :crear, :eliminar, :actualizar, :editar]
  before_action :get_object_fields, only: [:index, :crear, :actualizar, :eliminar, :mostrar]

  def principal
		grupos = @sets.map {|k,v| v[:model]}
    @groups = []
    grupos.each_with_index do |g,i|
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.today-30).pluck(:nombre,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.today-30).pluck(:titulo,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.current-30).pluck(:cita,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
      begin
        @groups << g.where("created_at >= ? OR updated_at >= ?", Date.today-30, Date.current-30).pluck(:badge,:created_at,:updated_at).map {|x| {nombre: x[0], fecha_creacion: x[1].to_date, fecha_upd: x[2].to_date, tipo: @sets.keys[i].to_s}}
      rescue Exception => e
        #next
      end
    end
    @groups = @groups.reject{|g| g.empty?}.flatten
    respond_to do |format|
      format.js
      format.json {render json: {groups: @groups, last_time: (Date.current() - 30)}}
    end
  end

  def panel
  end

  def index
    if params[:keyword].present?
      query
      @query = @query + (params[:complement].present? ? (" and " + params[:complement]) : "")
    else
      @query = (params[:complement].present? ? params[:complement] : "")
    end
    @rpp = 10
		@m = @sets[params[:set].to_sym][:model]
    @mod = (@m.class.to_s != "Array" ? @m : @m[0])
    @count = @mod.where(@query.present? ? @query : "").count
    @set = @mod.where(@query.present? ? @query : "").order(updated_at: :desc).limit(@rpp).offset(params[:offset].to_i*@rpp)

    @pags = (@count == 0 ? 0 : ((@count / @rpp) + (@count % @rpp == 0 ? 0 : 1) ))
    respond_to do |format|
      format.js
      #format.json {render json: {filas: @set} }
    end
  end

  def mostrar
		@obj = @sets[params[:set].to_sym][:model].find(params[:id].to_i)
    respond_to do |format|
      format.js
    end
  end

  def generar
    @obj = @sets[params[:set].to_sym][:model].new
    respond_to do |format|
      format.js
    end
  end

  def crear
    @obj = @sets[params[:set].to_sym][:model].new(obj_params)
	  @sets[params[:set].to_sym][:trix].each do |t|
      @obj[t] = (@obj[t].nil? ? "" : @obj[t].gsub(/<br><\/div>/,"</div>").gsub(/<br>(<br>)+/,"<br>").gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
    end
    respond_to do |format|
      if @obj.save
        if @sets[params[:set].to_sym][:model] == Sitio
          i = 0
          while i < obj_params[:num_parrafos].to_i
            @pf = Parrafo.new({sitio_id: @obj.id, p_ind: i})
            @pf.save
            i = i + 1
          end
          i = 0
          while i < obj_params[:num_fotos].to_i
            @pf = Foto.new({sitio_id: @obj.id, f_ind: i})
            @pf.save
            i = i + 1
          end
          i = 0
          while i < obj_params[:num_listing].to_i
            @pf = Listing.new({sitio_id: @obj.id, ord_index: i})
            @pf.save
            i = i + 1
          end
        end
        format.js { render :mostrar, params: {set: params[:set], id: @obj.id}, notice: 'Objeto generado exitosamente.' }
      else
        format.js { render :generar }
        format.json { render json: @obj.errors, status: :unprocessable_entity }
      end
    end
  end

  def editar
    if @sets[params[:set].to_sym][:model].class.to_s != "Array"
      @obj = @sets[params[:set].to_sym][:model].find(params[:id])
			@sets[params[:set].to_sym][:trix].each do |t|
        @obj[t] = (@obj[t].nil? ? "" : @obj[t].gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
      end
    elsif params[:set] == "Contenido de sitios"
      @obj = Sitio.find(params[:id])
      @pars = Parrafo.where("sitio_id = ?",params[:id].to_i)
      @pics = Foto.where("sitio_id = ?",params[:id].to_i)
      @pars.each do |p|
        p.texto = (p.texto.nil? ? "" : p.texto.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
        p.texto_ingles = (p.texto_ingles.nil? ? "" : p.texto_ingles.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
      end
      @pics.each do |p|
        p.caption = (p.caption.nil? ? "" : p.caption.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
        p.caption_ingles = (p.caption_ingles.nil? ? "" : p.caption_ingles.gsub(/<p>/,"<div>").gsub(/<\/p>/,"</div>").gsub(/<\/div><div>/,"<br>"))
      end
    end
  end

  def actualizar
    @obj = @sets[params[:set].to_sym][:model].find(params[:id])
    if params[:set] != "Contenido de sitios"
      @sets[params[:set].to_sym][:trix].each do |t|
        obj_params[t] = obj_params[t].gsub(/<br><\/div>/,"</div>").gsub(/<br>(<br>)+/,"<br>").gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>")
      end
    end
    respond_to do |format|
      if params[:set] == "Contenido de sitios"
        if params[:pars].present?
          @llaves_pars = params[:pars].keys
          @vals_pars = params[:pars].values
          params[:pars].each_with_index do |p,i|
					  @vals_pars[i]["texto"] = (@vals_pars[i]["texto"].nil? ? (Parrafo.find(@llaves_pars[i].to_i).texto.nil? || Parrafo.find(@llaves_pars[i].to_i).texto == "" ? "" : Parrafo.find(@llaves_pars[i].to_i).texto) : @vals_pars[i]["texto"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
					  @vals_pars[i]["texto_ingles"] = (@vals_pars[i]["texto_ingles"].nil? ? (Parrafo.find(@llaves_pars[i].to_i).texto_ingles.nil? || Parrafo.find(@llaves_pars[i].to_i).texto_ingles == "" ? "" : Parrafo.find(@llaves_pars[i].to_i).texto_ingles) : @vals_pars[i]["texto_ingles"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
          Parrafo.find(@llaves_pars[i].to_i).update(par_params(ActionController::Parameters.new(@vals_pars[i])))
          end
        end
        if params[:pics].present?
          @llaves_pics = params[:pics].keys
          @vals_pics = params[:pics].values
          params[:pics].each_with_index do |p,i|
					  @vals_pics[i]["caption"] = (@vals_pics[i]["caption"].nil? ? (Foto.find(@llaves_pics[i].to_i).caption.nil? || Foto.find(@llaves_pics[i].to_i).caption == "" ? "" : Foto.find(@llaves_pics[i].to_i).caption) : @vals_pics[i]["caption"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
					  @vals_pics[i]["caption_ingles"] = (@vals_pics[i]["caption_ingles"].nil? ? (Foto.find(@llaves_pics[i].to_i).caption_ingles.nil? || Foto.find(@llaves_pics[i].to_i).caption_ingles == "" ? "" : Foto.find(@llaves_pics[i].to_i).caption_ingles) : @vals_pics[i]["caption_ingles"].gsub(/<br>/,"</p><p>").gsub(/<div>/,"<p>").gsub(/<\/div>/,"</p>"))
            Foto.find(@llaves_pics[i].to_i).update(pic_params(ActionController::Parameters.new(@vals_pics[i])))
          end
        end
        if params[:listings].present?
          @llaves_list = params[:listings].keys
          @vals_list = params[:listings].values
          params[:listings].each_with_index do |p,i|
            Listing.find(@llaves_list[i].to_i).update(list_params(ActionController::Parameters.new(@vals_list[i])))
          end
        end
        if params[:uri]
          format.html {redirect_to params[:uri]}
        else
          format.js { render :mostrar, params: {set: params[:set], id: params[:id]}, notice: 'Objeto generado exitosamente.' }
        end
      elsif @obj.update(obj_params)
        if @sets[params[:set].to_sym][:model] == Sitio
          @num_pars = Parrafo.where("sitio_id = ?", params[:id].to_i)
          @num_fotos = Foto.where("sitio_id = ?", params[:id].to_i)
          @num_listing = Listing.where("sitio_id = ?", params[:id].to_i)
          if @num_pars.count < obj_params[:num_parrafos].to_i
            k = 0
            while k < obj_params[:num_parrafos].to_i
              if Parrafo.where("sitio_id = ? and p_ind = ? ", params[:id].to_i, k).count == 0
                @pf = Parrafo.new({sitio_id: params[:id].to_i, p_ind: k})
                @pf.save
              end
              k = k + 1
            end
          else
            while @num_pars.count > obj_params[:num_parrafos].to_i
              @num_pars[-1].destroy
            end
          end

          if @num_fotos.count < obj_params[:num_fotos].to_i
            k = 0
            while k < obj_params[:num_fotos].to_i
              if Foto.where("sitio_id = ? and f_ind = ? ",params[:id].to_i, k).count == 0
                @pf = Foto.new({sitio_id: params[:id].to_i, f_ind: k})
                @pf.save
              end
              k = k + 1
            end
          else
            while @num_fotos.count > obj_params[:num_fotos].to_i
              @num_fotos[-1].destroy
            end
          end

          if @num_listing.count < obj_params[:num_listing].to_i
            k = 0
            while k < obj_params[:num_listing].to_i
              if Listing.where("sitio_id = ? and ord_index = ?",params[:id].to_i, k).count == 0
                @pf = Listing.new({sitio_id: params[:id].to_i, ord_index: k})
                @pf.save
              end
              k = k + 1
            end
          else
            while @num_listing.count > obj_params[:num_listing].to_i
              @num_listing[-1].destroy
            end
          end

        end
        format.js { render :mostrar, params: {set: params[:set], id: @obj.id}, notice: 'Objeto generado exitosamente.' }
      else
        format.js { render :editar }
        format.json { render json: @obj.errors, status: :unprocessable_entity }
      end
    end
  end

  def eliminar
		@sets[params[:set].to_sym][:model].find(params[:id]).destroy
    if params[:set] == "Catálogo de sitios"
      Parrafo.where("sitio_id = ?", params[:id].to_i).destroy_all
      Foto.where("sitio_id = ?", params[:id].to_i).destroy_all
      Listing.where("sitio_id= ?",params[:id].to_i).destroy_all
    end
    @set = @sets[params[:set].to_sym][:model].order(updated_at: :desc).limit(@rpp).offset(0)
    @rpp = 10
    @count = @sets[params[:set].to_sym][:model].count
    @pags = (@count == 0 ? 0 : ((@count / @rpp) + (@count % @rpp == 0 ? 0 : 1) ))
		respond_to do |format|
      format.js { render :index, params: {set: params[:set]}, notice: 'Se ha eliminado el objeto exitosamente'}
		  format.json { head :no_content }
		end
  end

  private

  def query
    @query = "("
    keys = params[:keyword].split(/ +/).map {|k| " like '%" + k.downcase + "%'"}
    @fields.keys.each do |f|
      h = ""
      keys.each_with_index do |k,i|
        h =  h + f.to_s + k + (i == keys.size - 1 ? '' : ' AND ')
      end

      @query = @query + h + (f == @fields.keys[-1] ? ")" : " or ")
    end
  end

  def select_set
    @sets = {
      "Profesores eméritos": {
        model: Emerito, 
        fields: {nombre: "Nombre",fecha_anexion: "Fecha de anexión",centro: "Centro",semblanza: "Semblanza",semblanza_eng: "Semblanza (Inglés)"}, 
        imgs: {foto: "Foto"},
        trix: [:nombre, :semblanza, :semblanza_eng]
      }, "Programas docentes": {
        model: Curso,
        fields: {titulo: "Título",descripcion: "Descripción",fecha_inicio_conv: "Inicio de convocatoria",fecha_fin_conv: "Fin de convocatoria",fecha_inicio_clases: "Inicio de clases",fecha_fin_clases: "Fin de clases",liga: "Link",programa: "Programa docente",tipo_curso: "Tipo de curso",imparte: "Impartido por",traduccion_tit: "Título (Inglés)", traduccion_desc: "Descripción (Inglés)"},
        imgs: {foto: "Foto"},
        trix: [:titulo, :traduccion_tit, :descripcion, :imparte, :traduccion_desc]
      }, "Directorio de Autoridades": {
        model: Personal,
        fields: {nombre: "Nombre",seccion: "Sección",correo: "Correo electrónico",telefono: "Teléfono",extension: "Extensión",depto: "Departamento",cargo: "Cargo"},
        imgs: {foto: "Foto"},
        trix: []
      }, "Categorías de Premios": {
        model: Categorium,
        fields: {nombre: "Nombre", nombre_eng: "Nombre (Inglés)"},
        imgs: {},
        trix: []
      }, "Premios y distinciones": {
        model: Premiado,
        fields: {nombre: "Nombre", descripcion: "Descripción",tipo_premio: "Otorgado a",tipo: "Sección (comunidad)",liga: "Link"},
        imgs: {},
        trix: [:nombre, :descripcion]
      }, "Documentos varios": {
        model: Documento,
        fields: {nombre: "Título",nombre_eng: "Título (Inglés)",tipo: "Sección",anio: "Año",liga: "Link"},
        imgs: {archivo: "Archivo"},
        trix: [:nombre, :nombre_eng]
      }, "Descubre": {
        model: Descubre,
        fields: {titulo: "Título",liga: "Link",contenido: "Categoría",fecha_publicacion: "Fecha de despliegue",fecha_limite_pub: "Fecha de expiración",tags: "Etiquetas"},
        imgs: {imagen: "Imagen"},
        trix: [:titulo]
      }, "Categorías de 'Descubre'": {
        model: Content,
        fields: {tipo: "Tipo",tipo_eng: "Tipo (Inglés)"},
        imgs: {icono: "Ícono"},
        trix: []
      }, "Imágenes de slider": {
        model: Slider,
        fields: {liga: "Link", link_eng: "Link (inglés)", fecha_expiracion: "Fecha de expiración",posicion: "Posición (badge)"},
        imgs: {imagen: "Imagen",badge: "Badge", badge_eng: "Badge (Inglés)"},
        trix: []
      }, "Cátedras y seminarios": {
        model: Catedra,
        fields: {titulo: "Título",titulo_eng: "Título (Inglés)",descripcion: "Descripción",descripcion_eng: "Descripción (Inglés)",tipo: "Tipo",liga: "Link"},
        imgs: {},
        trix: [:titulo, :titulo_eng, :descripcion, :descripcion_eng]
      }, "Frases en página principal": {
        model: Frase,
        fields: {cita: "Cita",cita_eng: "Cita (Inglés)",autor: "Autor"},
        imgs: {},
        trix: [:cita, :cita_eng, :autor]
      }, "Directorio académico": {
        model: Academico,
        fields: {nombre: "Nombre",inicial: "Inicial",correo: "Correo electrónico",adscripcion: "Centro de Estudios",lineas_investigacion: "Líneas de investigación",pagina: "Sitio personal"},
        imgs: {foto: "Foto"},
        trix: []
      }, "Usuarios gestores": {
        model: Admin,
        fields: {usuario: "Usuario",admin: "Tipo"},
        imgs: {},
        trix: []
      }, "Catálogo de sitios": {
        model: Sitio,
        fields: {ref: "Página", partial: "URL", num_parrafos: "Párrafos", num_fotos: "Fotos", num_listing: "Listados"},
        imgs: {},
        trix: []
      }, "Contenido de sitios": {
        model: [Sitio,Parrafo, Foto],
        fields: [{ref: "Página", partial: "URL", num_parrafos: "Párrafos", num_fotos: "Fotos", num_listing: "Listados"}, {ref: "Página", texto: "Texto", texto_ingles: "Texto (Inglés)", p_ind: "Párrafo"}, {ref: "Página", f_ind: "Foto"}],
        imgs: [{}, {}, {foto: "Foto"}],
        trix: [[],[:texto, :texto_ingles],[]]
      }
    }
  end

  def get_object_fields
    @fields = (@sets[params[:set].to_sym][:fields].class.to_s != "Array" ? @sets[params[:set].to_sym][:fields] : @sets[params[:set].to_sym][:fields][0] )
    @imgs = (@sets[params[:set].to_sym][:imgs].class.to_s != "Array" ? @sets[params[:set].to_sym][:imgs] : @sets[params[:set].to_sym][:imgs][0])
  end

  def par_params(pars)
    pars.permit(:ref, :texto, :texto_ingles, :p_ind)
  end

  def pic_params(pics)
    pics.permit(:ref, :foto, :f_ind, :caption, :caption_ingles)
  end

  def list_params(lists)
    lists.permit(:ord_index, :list_id, :sitio_id)
  end

  def obj_params
    if params[:set] == "Profesores eméritos"
      params.require(:emerito).permit(:nombre, :fecha_anexion, :centro, :semblanza, :foto, :semblanza_eng)
    elsif params[:set] == "Programas docentes"
      params.require(:curso).permit(:titulo, :descripcion, :fecha_inicio_conv, :fecha_fin_conv, :fecha_inicio_clases, :liga, :programa, :tipo_curso, :traduccion_tit, :traduccion_desc, :tags, :fecha_fin_clases, :tipo_curso_linea, :foto, :imparte)
    elsif params[:set] == "Directorio de Autoridades"
      params.require(:personal).permit(:nombre, :seccion, :correo, :telefono, :extension, :cargo, :depto, :foto, :cargo_eng, :depto_eng)
    elsif params[:set] == "Categorías de Premios"
      params.require(:categorium).permit(:nombre,:nombre_eng)
    elsif params[:set] == "Premios y distinciones"
      params.require(:premiado).permit(:nombre, :descripcion, :tipo, :tipo_premio, :liga)
    elsif params[:set] == "Documentos varios"
      params.require(:documento).permit(:nombre, :tipo, :anio, :archivo, :nombre_eng)
    elsif params[:set] == "Descubre"
      params.require(:descubre).permit(:titulo, :liga, :contenido, :fecha_publicacion, :fecha_limite_pub, :imagen, :tags)
    elsif params[:set] == "Categorías de 'Descubre'"
      params.require(:content).permit(:tipo, :icono, :tipo_eng)
    elsif params[:set] == "Imágenes de slider"
      params.require(:slider).permit(:liga, :imagen, :badge, :posicion, :fecha_expiracion, :badge_eng, :link_eng)
    elsif params[:set] == "Cátedras y seminarios"
      params.require(:catedra).permit(:titulo, :titulo_eng, :descripcion_eng, :descripcion, :liga, :tipo)
    elsif params[:set] == "Frases en página principal"
      params.require(:frase).permit(:cita, :autor, :cita_eng)
    elsif params[:set] == "Directorio académico"
      params.require(:academico).permit(:nombre, :adscripcion, :lineas_investigacion, :correo, :pagina, :foto, :inicial)
    elsif params[:set] == "Usuarios gestores"
      params.require(:admin).permit(:usuario, :password, :password_confirmation, :admin)
    elsif params[:set] == "Catálogo de sitios"
      params.require(:sitio).permit(:ref, :partial, :num_parrafos, :num_fotos, :num_listing)
    end
  end
end
