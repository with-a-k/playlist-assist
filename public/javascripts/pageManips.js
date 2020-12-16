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
        <button class="pseudolink" id="${playlistInfo.playlist_id}">
          Start with this playlist</button>
      </li>`
    );
  });
  $('.playlists').append(
    `<li class="playlist">
      <h3>No Playlist</h3>
      <button class="pseudolink" id="none">
        Start without loading a playlist</button>
    </li>`
  );
  $('.pseudolink').on("click", function(e) {
    loadTracksFromPlaylist(e.target.id);
    e.preventDefault();
  });
}
