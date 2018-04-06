class CreateCursoBreve < ActiveRecord::Migration
  def change
    create_table :cursos_breves do |t|
      t.text :nombre, null: false
    end
  end
end
