class ProduccionDigitalController < ApplicationController

  @cursos = ["El TLCAN, 20 años después", "La crisis ambiental contemporánea", "Albert Camus (1913-1960)", "El corrido mexicano", "Historia del México Colonial a través de la Real Hacienda", "Sudáfrica, breve historia", "George Orwell (1903-1950)", "Vida y cultura medieval"]
  @listas = ["Temas de interés", "Comentarios al libro", "Videos de promoción", "Tertulias de hostoriadores.", "Historias Mínimas", "Serie documental", "Seminario sobre Desigualdad Socioeconómica y Educativa", "Seminario sobre Trabajo y Desigualdades", "Seminario Migración, Desigualdad y Políticas"] 

  def cursos_breves
    @curs = []
    @cursos.each_with_index do |v,i|
      @curs << {curso: v, img: ActionController::Base.helpers.image_url("gif"+i.to_s+".gif").html_safe}
    end
		respond_to do |format|
      format.html
      format.json {render json: {cursos: @curs} }
    end
  end

  def reproducir
    @vids = recuperar_videos(params[:titulo)
    @videos = Video.where("tipo = ? AND curso = ?","Curso",params[:titulo])
    respond_to do |format|
      format.html { render '/produccion_digital/curso_breve/reproducir' }
      format.json {render json: {referente_vids: @vids, videos: @videos} }
    end
  end

  def principal
    @algo = {prueba: "a"}
    respond_to do |format|
      format.html
      format.json {render json: @algo }
    end
  end

  protected

  def recuperar_videos(lista)
    canal = Yt::Channel.new id: Rails.application.secrets.ch_id
    v_list = []
    if lista.kind_of?(String)
      canal.playlists.find {|pl| pl.title == lista}.playlist_items.each do |v|
        video = Yt::Video.new id: v.video_id
        v_list << {id: v.video_id, fecha: video.published_at, titulo: v.title, descripcion: v.description, thumbnail: v.thumbnail_url, vistas: video.view_count, likes: video.like_count, dislikes: video.dislike_count, favs: video.favorite_count, comentarios: video.comment_count, tags: video.tags}
      end
    elsif lista.kind_of?(Array)
      lista.each do |list_titulo|
        canal.playlists.find {|pl| pl.title == list_titulo}.playlist_items.each do |v|
          video = Yt::Video.new id: v.video_id
          v_list << {id: v.video_id, fecha: video.published_at, titulo: v.title, descripcion: v.description, thumbnail: v.thumbnail_url, vistas: video.view_count, likes: video.like_count, dislikes: video.dislike_count, favs: video.favorite_count, comentarios: video.comment_count, tags: video.tags}
        end
      end   
    end
    return v_list
  end
end
