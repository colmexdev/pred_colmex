class ProduccionDigitalController < ApplicationController
  def cursos_breves
		@videos = Video.where("tipo = ?", "Curso")
    @curs = [].to_set
    @cursos = []
		#@participantes = []
		@videos.each_with_index do |v,i|
		  #Participante.where("id_video = ?", v.id) do |p|
      #  @participantes << p
      #end
			
      @curs << v.curso
    end
    @curs.each_with_index do |v,i|
      @cursos << {curso: v, img: ActionController::Base.helpers.image_url("gif"+i.to_s+".gif").html_safe}
    end
		gon.prueba = "a"
		respond_to do |format|
      format.html
      format.json {render json: {videos: @videos, cursos: @cursos.to_a} }
    end
  end
end
