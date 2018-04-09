class AddGrupoToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :grupo, :text
  end
end
