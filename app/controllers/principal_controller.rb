class PrincipalController < ApplicationController
  def inicio
  end

  def get_videos
    @vpp = 10 #Videos por página
    @offset = params[:offset] || 0 #Página
    @values = params[:keyword].split(/ +/).map {|k| Regexp.quote(k) }
    @videos = InfoVideo.where("")
    respond_to do |format|
      format.json {render json: {valores: @values}}
    end
  end
end
