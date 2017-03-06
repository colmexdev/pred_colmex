class ProduccionDigitalController < ApplicationController
  def cursos_breves
		@prueba = {algo: "a"}
		gon.prueba = "a"
		respond_to do |format|
      format.html
      format.json {render json: @prueba }
    end
  end
end
