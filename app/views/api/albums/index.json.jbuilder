@albums.each do |album|
    json.set! album.id do
        json.extract! album, :id, :name, :artist_id
        json.set! :artist, album.artist.name
        json.photo album.photo.attached? ? url_for(album.photo) : nil
    end
end