class PrincipalController < ApplicationController
  def inicio
  end

  def get_videos
    @vpp = (params.key?(:vpp) ? (params[:vpp].to_i < 1 ? 1 : params[:vpp].to_i) : 10) #Videos por página
    @offset = (params.key?(:offset) ? (params[:offset].to_i < 1 ? 1 : params[:offset].to_i) : 1) #Página
    @videos = InfoVideo.where(build_query(params))
    @total = @videos.size

    respond_to do |format|
      format.json {render json: {vids: @videos.limit(@vpp).offset((@offset-1)*@vpp), pags: (@total.fdiv(@vpp)).ceil, curr_page: @offset, prev_page: (@offset -1 < 1 || @offset - 1 >= @total.fdiv(@vpp).ceil ? nil : @offset - 1), next_page: (@offset + 1 >= @total.fdiv(@vpp).ceil ? nil : @offset + 1), total: @total, first_page: (@offset == 1), last_page: (@offset == @total.fdiv(@vpp).ceil ||(@offset == 1 && @total == 0)) }}
    end
  end

  protected

  def build_query(pars)
    string = ""
    concat = false
    if pars.key?(:titulo)
      string = string + "titulo like '%" + pars[:titulo].mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s + "%'"
      concat = true
    end
    if pars.key?(:lista)
      string = string + (concat ? " AND " : "") + "lista = '" + pars[:lista].mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s + "'"
      concat = true
    end
    if pars.key?(:tags)
      pars[:tags].split(/ *, */).map {|t| t.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s }.each do |t|
        string = string + (concat ? " AND " : "") + "tags like '%" + t + "%'"
        concat = true
      end
    end
    if pars.key?(:fecha)
      op = (pars[:fecha_bool] == "le" ? "<=" : (pars[:fecha_bool] == "ge" ? ">" : "="))
      string = string + (concat ? " AND " : "") + "fecha " + op + "timestamp '" + pars[:fecha] + "'"
    end
    logger.debug string
    return string
  end
end

