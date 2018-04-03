class RegistrationsController < Devise::RegistrationsController
  skip_before_filter :require_no_authentication, :only => [ :new, :create, :cancel ]

  def new
    super
  end

  def create
    build_resource(sign_up_params)

    respond_to do |format|
      if resource.save
        format.html { redirect_to @admin, notice: 'Admin was successfully created.' }
        format.json { render :show, status: :created, location: @admin }
      else
        format.html { render :new }
        format.json { render json: @admin.errors, status: :unprocessable_entity }
      end
    end

  end

  def update
    super
  end
end 
