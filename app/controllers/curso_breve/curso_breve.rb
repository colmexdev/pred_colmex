class CursoBreveController < ApplicationController

  def curso1
    @algo = {algo: "x"}
    respond_to do |format|
      format.html
      format.json {render json: @algo }
    end
  end
end
