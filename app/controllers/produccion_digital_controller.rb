class ProduccionDigitalController < ApplicationController
  def cursos_breves
		@videos = Video.where("tipo = ?", "Curso")
    @curs = [].to_set
    @cursos = []
		#@participantes = []
		@videos.each_with_index do |v,i|
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

  def reproducir
    @videos = Video.where("tipo = ? AND curso = ?","Curso",params[:titulo])
    respond_to do |format|
      format.html { render '/produccion_digital/curso_breve/reproducir' }
      format.json {render json: @videos }
    end
  end

  def principal
    @algo = {prueba: "a"}
    respond_to do |format|
      format.html
      format.json {render json: @algo }
    end
  end
end
