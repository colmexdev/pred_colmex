class ProduccionDigitalController < ApplicationController
  def cursos_breves
		@videos = Video.where("tipo = ?", "Curso")
    @cursos = @videos.group(:curso)
		@participantes = []
		@videos.each do |v|
		  Participante.where("id_video = ?", v.id) do |p|
        @participantes << p
      end
    end
		gon.prueba = "a"
		respond_to do |format|
      format.html
      format.json {render json: {videos: @videos, cursos: @cursos} }
    end
  end
end
