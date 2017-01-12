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
    @cats = Video.pluck(:tipo)
		@vid_act = Video.maximum(:id)
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
    @video = Video.new
		@participantes = []
		@parts.times do
			@participantes << Participante.new
    end
  end

  # GET /videos/1/edit
  def edit
  end

  # POST /videos
  # POST /videos.json
  def create
		#params[:video][:fecha] = DateTime.strptime(params[:video][:fecha], "%Y-%m-%d %H:%M:%S UTC")
    @video = Video.new(video_params)
    params[:parts].each do |part|
      Participante.create(participante_params(part))
    end

    respond_to do |format|
      if @video.save
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
		@parts = Participante.where("video_id = ?", @video[:id])
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
      params.fetch(:video, {})
    end

    def participante_params(part_params)
      part_params.permit(:nombre,:institucion,:centro,:video_id)
    end
end
