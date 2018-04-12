class ProduccionDigitalController < ApplicationController
  before_action :set_listas 

  def cursos_breves
    @curs = []
    @listas.where(grupo: "Cursos breves").each_with_index do |v,i|
      @curs << {curso: v.nombre, img: ActionController::Base.helpers.image_url("gif"+i.to_s+".gif").html_safe}
    end
		respond_to do |format|
      format.html
      format.json {render json: @curs }
    end
  end

  def reproducir
    @vids = InfoVideo.where(lista: params[:titulo]).order(fecha: :asc)
    respond_to do |format|
      format.html { render '/produccion_digital/curso_breve/reproducir' }
      format.json {render json: @vids}
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

  def set_listas
    @listas = Playlist.all
  end

end
