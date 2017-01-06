class CreateParticipantes < ActiveRecord::Migration
  def change
    create_table :participantes do |t|

      t.timestamps null: false
    end
  end
end
