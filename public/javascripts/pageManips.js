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
          event.preventDefault();
          loadTracksFromPlaylist('${playlistInfo.playlist_id}')};">
          Start with this playlist</a>
      </li>`
    );
  });
  $('.playlists').append(
    `<li class="playlist">
      <h3>No Playlist</h3>
      <a href="#" onClick="function s(event) {
        event.preventDefault();
        loadTracksFromPlaylist('none')};">
        Start without loading a playlist</a>
    </li>`
  );
}
