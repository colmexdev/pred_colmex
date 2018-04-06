class CreateCursoBreve < ActiveRecord::Migration
  def change
    create_table :cursos_breves do |t|
      t.text :nombre, null: false
      t.timestamps null: false
    end
  end
end
