class VideosController < ApplicationController
  before_action :set_video, only: [:show, :edit, :update, :destroy]

  def id
    
  end

  # GET /videos
  # GET /videos.json
  def index
    @videos = Video.all
  end

  # GET /videos/1
  # GET /videos/1.json
  def show
  end

  # GET /videos/new
  def new
    @vid = Yt::Video.new id: params[:id_vid]
		@parts = params[:num_part].to_i
    @cats = Video.pluck(:tipo).to_a
		@titulos = Video.where("curso IS NOT NULL").pluck(:curso).to_a
    @tipos, @cursos = [].to_set, [].to_set
    @cats.each do |c|
      @tipos << [c,c]
    end
    @titulos.each do |t|
      @cursos << [t,t]
    end
		@tipos = @tipos.to_a
		@cursos = @cursos.to_a
    @video = Video.new
		@participantes = []
		@parts.times do
			@participantes << Participante.new
    end
  end

  # GET /videos/1/edit
  def edit

    @vid = Yt::Video.new id: @video.liga.split('/')[-1]

    @cats = Video.pluck(:tipo)
		@titulos = Video.where("curso IS NOT NULL").pluck(:curso)
    @tipos, @cursos = [].to_set, [].to_set
    @cats.each do |c|
      @tipos << [c,c]
    end
    @titulos.each do |t|
      @cursos << [t,t]
    end
		@tipos = @tipos.to_a
		@cursos = @cursos.to_a

		@participantes = Participante.where("id_video = ?",@video.id)

  end

  # POST /videos
  # POST /videos.json
  def create
    params[:video][:fecha] = DateTime.strptime(params[:video][:fecha], "%Y-%m-%d %H:%M:%S UTC")
    @video = Video.new(video_params)

    respond_to do |format|
      if @video.save
			@v_id = Video.maximum(:id)
      params[:parts].each do |part|
				part[:id_video] = @v_id
        @p = Participante.new(participante_params(part))
        if !@p.save
          format.html { render :new }
          format.json { render json: @video.errors, status: :unprocessable_entity }
        end
      end
        format.html { redirect_to @video, notice: 'El video se ha registrado con éxito en el catálogo.' }
        format.json { render :show, status: :created, location: @video }
      else
        format.html { render :new }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /videos/1
  # PATCH/PUT /videos/1.json
  def update
    respond_to do |format|
      if @video.update(video_params)
        @llaves = params[:parts].keys
        @vals = params[:parts].values
        i = 0
				params[:parts].each do |part|
					
          if !Participante.find(@llaves[i].to_i).update(participante_params(ActionController::Parameters.new(@vals[i])))
            format.html { render :new }
            format.json { render json: @video.errors, status: :unprocessable_entity }
          end
          i = i + 1
        end

        format.html { redirect_to @video, notice: 'El video se ha actualizado con éxito.' }
        format.json { render :show, status: :ok, location: @video }
      else
        format.html { render :edit }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /videos/1
  # DELETE /videos/1.json
  def destroy
		@parts = Participante.where("id_video = ?", @video[:id])
		@parts.each do |p|
      p.destroy
    end
    @video.destroy
    respond_to do |format|
      format.html { redirect_to videos_url, notice: 'El video se ha eliminado exitosamente del catálogo.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def video_params
      params.require(:video).permit(:titulo,:fecha,:liga,:tipo,:curso)
    end

    def participante_params(part_params)
      part_params.permit(:nombre,:institucion,:centro,:id_video)
    end
end
