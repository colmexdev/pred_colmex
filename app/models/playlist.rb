class Playlist < ActiveRecord::Base
  self.table_name = "playlists"

  validates_presence_of :nombre
end
