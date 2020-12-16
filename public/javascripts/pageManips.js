function displayPlaylists(response) {
  $('.playlists').empty();
  let playlists = response.items;
  playlists.forEach(function(playlist) {
    let playlistInfo = {
      name: playlist.name,
      playlist_id: playlist.id
    }
    $('.playlists').append(
      `<li class="playlist">
        <h3>${playlistInfo.name}</h3>
        <button class="pseudolink load-playlist" id="${playlistInfo.playlist_id}">
          Start with this playlist</button>
      </li>`
    );
  });
  $('.playlists').append(
    `<li class="playlist">
      <h3>No Playlist</h3>
      <button class="pseudolink load-playlist" id="none">
        Start without loading a playlist</button>
    </li>`
  );
  $('.pseudolink.load-playlist').on("click", function(e) {
    loadTracksFromPlaylist(e.target.id);
    e.preventDefault();
  });
}

function showTrackSelector(startingTracks) {
  let simpleInfo = startingTracks.map(function(trackObject) {
    return {
      id: trackObject.track.id,
      albumName: trackObject.track.album.name,
      artistNames: trackObject.track.artists.map(artist => artist.name),
      trackName: trackObject.track.name
    }
  });
  $('.playlists').empty();
  simpleInfo.forEach(function (track) {
    $('.added-tracks').append(
      `<li class="track-added" id=${track.id}>
        <h3>${track.trackName}</h3>
        <h4>Artists: ${trackObject.artistNames.join(', ')}</h4>
        <h4>Album: ${trackObject.albumName}</h4>
        <button class="pseudolink remove-track">Remove from List</button>
      </li>`
    );
  });
  $('.pseudolink.remove-track').on('click', function (e) {
    console.log(e.target);

  });
  $('.track-selector:hidden').show();
}
