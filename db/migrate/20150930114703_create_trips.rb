class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.integer :author_id, null: false
      t.string :destination
      t.date :start_date
      t.date :end_date
      t.text :comment

      t.timestamps null: false
    end

    add_index :trips, :author_id
  end
end
