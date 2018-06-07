class PrincipalController < ApplicationController
  def inicio
  end

  def get_videos
    @vpp = (params.key?(:vpp) ? (params[:vpp].to_i < 1 ? 1 : params[:vpp].to_i) : 10) #Videos por página
    @offset = (params.key?(:offset) ? (params[:offset].to_i < 1 ? 1 : params[:offset].to_i) : 1) #Página
    @videos = InfoVideo.where(build_query(params))
    @total = @videos.size

    respond_to do |format|
      format.json {render json: {vids: (params.key?(:all) && params[:all] == "true" ? @videos.all : @videos.limit(@vpp).offset((@offset-1)*@vpp), pags: (@total.fdiv(@vpp)).ceil), curr_page: @offset, prev_page: (@offset -1 < 1 || @offset - 1 >= @total.fdiv((params.key?(:all) && params[:all] == "true" ? @total : @vpp)).ceil ? nil : @offset - 1), next_page: (@offset + 1 >= @total.fdiv((params.key?(:all) && params[:all] == "true" ? @total : @vpp)).ceil ? nil : @offset + 1), total: @total, first_page: (@offset == 1), last_page: (@offset == @total.fdiv((params.key?(:all) && params[:all] == "true" ? @total : @vpp)).ceil ||(@offset == 1 && @total == 0)) }}
    end
  end

  protected

  def build_query(pars)
    string = ""
    concat = false
    if pars.key?(:titulo)
      string = string + "lower(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(titulo,'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'Á','A'),'É','E'),'Í','I'),'Ó','O'),'Ú','U')) like '%" + pars[:titulo].mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s + "%'"
      concat = true
    end
    if pars.key?(:lista)
      string = string + (concat ? " AND " : "") + "lower(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(lista,'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'Á','A'),'É','E'),'Í','I'),'Ó','O'),'Ú','U')) = '" + pars[:lista].mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s + "'"
      concat = true
    end
    if pars.key?(:tags)
      pars[:tags].split(/ *, */).map {|t| t.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s }.each do |t|
        string = string + (concat ? " AND " : "") + "lower(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(tags,'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'Á','A'),'É','E'),'Í','I'),'Ó','O'),'Ú','U')) like '%" + t + "%'"
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

