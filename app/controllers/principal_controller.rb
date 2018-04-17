class PrincipalController < ApplicationController
  def inicio
  end

  def get_videos
    @vpp = 10 #Videos por página
    @offset = params[:offset] || 0 #Página
    @videos = InfoVideo.where(build_query(params))
    respond_to do |format|
      format.json {render json: @videos}
    end
  end

  protected

  def build_query(pars)
    string = ""
    concat = false
    if pars.key?(:title)
      string = string + "lower(titulo) like '%" + pars[:title].downcase + "%'"
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
