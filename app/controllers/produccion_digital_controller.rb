class ProduccionDigitalController < ApplicationController
  def cursos_breves
		@videos = Video.where("tipo = ?", "Curso")
    @cursos = [].to_set
		@participantes = []
		@videos.each_with_index do |v,i|
		  Participante.where("id_video = ?", v.id) do |p|
        @participantes << p
      end
      @cursos << {v.curso, "gif"+i+".gif"}
    end
		gon.prueba = "a"
		respond_to do |format|
      format.html
      format.json {render json: {videos: @videos, cursos: @cursos.to_a} }
    end
  end
end
