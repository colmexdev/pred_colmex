class PrincipalController < ApplicationController
  def inicio
  end

  def get_videos
    @vpp = 10 #Videos por página
    @offset = params[:offset] || 0 #Página
    @videos = InfoVideo.where(build_query(params))
    @total = @videos.size

    respond_to do |format|
      format.json {render json: {vids: @videos.limit(@vpp).offset(@offset*@vpp), pags: (@total.fdiv(@vpp)).ceil, offset: @offset}}
    end
  end

  protected

  def build_query(pars)
    string = ""
    concat = false
    if pars.key?(:titulo)
      string = string + "lower(titulo) like '%" + pars[:titulo].downcase + "%'"
      concat = true
    end
    if pars.key?(:lista)
      string = string + (concat ? " AND " : "") + "lower(lista) = '" + pars[:lista].downcase + "'"
      concat = true
    end
    if pars.key?(:tags)
      pars[:tags].split(/ *, */).map {|t| t.downcase }.each do |t|
        string = string + (concat ? " AND " : "") + "lower(tags) like '%" + t + "%'"
        concat = true
      end
    end
    if pars.key?(:fecha)
      op = (pars[:fecha_bool] == "le" ? "<=" : (pars[:fecha_bool] == "ge" ? ">" : "="))
      string = string + (concat ? " AND " : "") + "fecha " + op + "timestamp '" + pars[:fecha] + "'"
    end
    return string
  end
end
