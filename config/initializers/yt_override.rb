require 'open-uri'
require 'yt/models/base'

Yt::Models::Account.module_eval do
  def videos_params
    nil
  end
end
