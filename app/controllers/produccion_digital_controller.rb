class ProduccionDigitalController < ApplicationController
  def cursos_breves
		@videos = Video.where("tipo = ?", "Curso")
		@participantes = Participante.where("id_video IN ?", Video.plcuk(:id))
		gon.prueba = "a"
		respond_to do |format|
      format.html
      format.json {render json: @videos }
    end
  end
end
