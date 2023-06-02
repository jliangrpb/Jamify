class CreatePlaylistSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_songs do |t|
      t.references :playlist, null: false, foreign_key: {to_table: :playlists}
      t.references :song, null: false, foreign_key: {to_table: :songs}
      t.timestamps
    end
  end
end
