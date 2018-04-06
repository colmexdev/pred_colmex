class CreatePlaylist < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.text :nombre, null: false
      t.timestamps null: false
    end
  end
end
