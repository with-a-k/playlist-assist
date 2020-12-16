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
        <a href="#" onClick="function l(event) {
            loadTracksFromPlaylist('${playlistInfo.playlist_id}')
            event.preventDefault();
          };">
          Start with this playlist</a>
      </li>`
    );
  });
  $('.playlists').append(
    `<li class="playlist">
      <h3>No Playlist</h3>
      <a href="#" onClick="function s(event) {
          loadTracksFromPlaylist('none')
          event.preventDefault();
        };">
        Start without loading a playlist</a>
    </li>`
  );
}
