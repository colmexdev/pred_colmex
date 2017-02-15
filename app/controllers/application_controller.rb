class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  Yt.configure do |config|
    config.api_key = 'AIzaSyDdb0WKx3fYJjfOiEGq8rF4xHTIFR82kBA'
  end

  protected
  #def after_sign_in_path_for(resource)
  #  panel_path
  #end

  #def after_sign_out_path_for(resource_or_scope)
  #  new_admin_session_path
  #end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:usuario, :password, :password_confirmation])
  end
end
