class CreateInfoVideo < ActiveRecord::Migration
  def change
    create_table :info_videos do |t|
      t.text :v_id, null: false
      t.datetime :fecha, null: false
      t.text :titulo, null: false
      t.text :descripcion
      t.text :thumbnail
      t.text :lista, null: false, default: ""
      t.bigint :likes, null:false, default: 0
      t.bigint :dislikes, null: false, default: 0
      t.bigint :favs, null: false, default: 0
      t.bigint :comentarios, null: false, default: 0
      t.bigint :vistas, null: false, default: 0
      t.text :tags
      t.timestamps null: false
    end

    add_index :info_videos, :v_id, unique: true
  end
end
