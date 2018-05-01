class PanelController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_yt, only: [:actualizar_videos]
  before_action :select_set, only: [:principal, :index, :mostrar, :generar, :crear, :eliminar, :actualizar, :editar]
  before_action :get_object_fields, only: [:index, :crear, :actualizar, :eliminar, :mostrar]

  def oauth
    client = OAuth2::Client.new(ENV["YT_CLIENT"], ENV["YT_SECRET"], {authorize_url: "https://accounts.google.com/o/oauth2/v2/auth", token_url: "https://www.googleapis.com/oauth2/v4/token"})
    $pars = "&set=" + params[:set] + "&refresh=" + params[:refresh] + (params.key?(:vids) ? "&vids=" + params[:vids] : "")
    url = @client.auth_code.authorize_url(scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload", redirect_uri: "https://www.colmex.mx/vids/oauth2callback", access_type: "offline")
    redirect_to url
  end

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
    if params[:set]=="Videos"
      set_yt
    end
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

  def actualizar_videos
    logger.debug $pars
    respond_to do |format|
      format.html {redirect_to(panel_path, notice: "No hubo videos que sincronizar.") and return}
    end
    @playlists = @acc.playlists
    if params.key?(:refresh)
      if params[:refresh] == "full" || params[:refresh] == "to_date"
        lista_vids = (params[:refresh] == "full" ? @acc.videos : @acc.videos.map {|v| v.published_at.to_date >= InfoVideo.maximum(:fecha) ? v : nil}.compact )
        if lista_vids.size == 0
          respond_to do |format|
            format.html {redirect_to(panel_path, notice: "No hubo videos que sincronizar.") and return}
          end
        end 
        lista_vids.each do |v|
          if v.private?
            next
          else
            begin
              pst = @playlists.find {|pl| pl.playlist_items.find {|pli| pli.title == v.title}}
              fill_video(v,(v.unlisted? || pst.nil? ? "" : pst.title))
            rescue Exception => e
              next
            end
          end
        end
      elsif params[:refresh] == "part"
        params[:listas].each do |lista|
          @playlists.find {|pl| pl.title == lista}.playlist_items.each do |v|
            begin
              vid = @acc.videos.find {|vi| vi.id == v.video_id}
              fill_video(vid,lista)
            rescue Exception => e
              next
            end
          end
        end
      elsif params[:refresh] == "ids"
        params[:vids].split(/ *, */).each do |id|
          @yt_vid = @acc.videos.find {|video| video.id == id}
          if @yt_vid.private?
            next
          else
            begin
              pst = @playlists.find {|pl| pl.playlist_items.find {|pli| pli.title == @yt_vid.title}}
              fill_video(@yt_vid,(@yt_vid.unlisted? || pst.nil? ? "" : pst.title))
            rescue Exception => e
              next
            end
          end
        end
      end
    end
    respond_to do |format|
      format.html {redirect_to panel_path, notice: "Sincronización completada."}
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
#        if @sets[params[:set].to_sym][:model] == Sitio
#          i = 0
#          while i < obj_params[:num_parrafos].to_i
#            @pf = Parrafo.new({sitio_id: @obj.id, p_ind: i})
#            @pf.save
#            i = i + 1
#          end
#          i = 0
#          while i < obj_params[:num_fotos].to_i
#            @pf = Foto.new({sitio_id: @obj.id, f_ind: i})
#            @pf.save
#            i = i + 1
#          end
#          i = 0
#          while i < obj_params[:num_listing].to_i
#            @pf = Listing.new({sitio_id: @obj.id, ord_index: i})
#            @pf.save
#            i = i + 1
#          end
#        end
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
#        if @sets[params[:set].to_sym][:model] == Sitio
#          @num_pars = Parrafo.where("sitio_id = ?", params[:id].to_i)
#          @num_fotos = Foto.where("sitio_id = ?", params[:id].to_i)
#          @num_listing = Listing.where("sitio_id = ?", params[:id].to_i)
#          if @num_pars.count < obj_params[:num_parrafos].to_i
#            k = 0
#            while k < obj_params[:num_parrafos].to_i
#              if Parrafo.where("sitio_id = ? and p_ind = ? ", params[:id].to_i, k).count == 0
#                @pf = Parrafo.new({sitio_id: params[:id].to_i, p_ind: k})
#                @pf.save
#              end
#              k = k + 1
#            end
#          else
#            while @num_pars.count > obj_params[:num_parrafos].to_i
#              @num_pars[-1].destroy
#            end
#          end
#
#          if @num_fotos.count < obj_params[:num_fotos].to_i
#            k = 0
#            while k < obj_params[:num_fotos].to_i
#              if Foto.where("sitio_id = ? and f_ind = ? ",params[:id].to_i, k).count == 0
#                @pf = Foto.new({sitio_id: params[:id].to_i, f_ind: k})
#                @pf.save
#              end
#              k = k + 1
#            end
#          else
#            while @num_fotos.count > obj_params[:num_fotos].to_i
#              @num_fotos[-1].destroy
#            end
#          end
#
#          if @num_listing.count < obj_params[:num_listing].to_i
#            k = 0
#            while k < obj_params[:num_listing].to_i
#              if Listing.where("sitio_id = ? and ord_index = ?",params[:id].to_i, k).count == 0
#                @pf = Listing.new({sitio_id: params[:id].to_i, ord_index: k})
#                @pf.save
#              end
#              k = k + 1
#            end
#          else
#            while @num_listing.count > obj_params[:num_listing].to_i
#              @num_listing[-1].destroy
#            end
#          end
#
#        end
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

  def set_yt
    Yt.configure do |config|
      config.log_level = :debug
      config.client_id = Rails.application.secrets.yt_client
      config.client_secret = Rails.application.secrets.yt_secret
      config.api_key = Rails.application.secrets.yt_api_key
    end
    @acc = Yt::Account.new refresh_token: Rails.application.secrets.yt_token
  end

  def fill_video(v,list)
    @vid = InfoVideo.find_or_initialize_by(v_id: v.id)
    @vid.fecha = v.published_at
    @vid.titulo = v.title
    @vid.descripcion = v.description
    @vid.thumbnail = v.thumbnail_url
    @vid.lista = list
    @vid.likes = v.like_count
    @vid.dislikes = v.dislike_count
    @vid.favs = v.favorite_count
    @vid.comentarios = v.comment_count
    @vid.vistas = v.view_count
    @vid.tags = v.tags
    @vid.save
  end

  def query
    @query = "("
    keys = params[:keyword].split(/ +/).map {|k| " like '%" + k.downcase + "%'"}
    @fields.keys.each do |f|
      h = ""
      if ["fecha","likes","dislikes","favs","comentarios","vistas"].include?(f.to_s)
        next
      end
      keys.each_with_index do |k,i|
        h =  h + f.to_s + k + (i == keys.size - 1 ? '' : ' AND ')
      end

      @query = @query + h + (f == @fields.keys[-1] ? ")" : " or ")
    end
  end

  def select_set
    @sets = {
      "Listas de reproducción": {
        model: Playlist, 
        fields: {nombre: "Título", grupo: "Pertenece a"}, 
        imgs: {},
        trix: []
      }, "Videos": {
        model: InfoVideo,
        fields: {v_id: "Id de video", fecha: "Fecha", titulo: "Título", descripcion: "Descripción", lista: "En lista", likes: "Likes", dislikes: "Dislikes", favs: "Favoritos", comentarios: "Comentarios", vistas: "Vistas", tags: "Etiquetas", thumbnail: "Thumbnail"},
        imgs: {},
        trix: []
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
    if params[:set] == "Listas de reproducción"
      params.require(:playlist).permit(:nombre, :grupo)
    elsif params[:set] == "Videos"
      params.require(:info_video).permit(:v_id, :fecha, :titulo, :descripcion, :lista, :likes, :dislikes, :favs, :comentarios, :vistas, :tags, :thumbnail)
    end
  end
end
