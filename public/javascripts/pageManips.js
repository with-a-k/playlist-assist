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
        <a href="#" class="psuedolink" id="${playlistInfo.playlist_id}">
          Start with this playlist</a>
      </li>`
    );
  });
  $('.playlists').append(
    `<li class="playlist">
      <h3>No Playlist</h3>
      <a href="#" class="psuedolink" id="none">
        Start without loading a playlist</a>
    </li>`
  );
  $('.pseudolink').on("click", function(e) {
    console.log(e.target.id);
    loadTracksFromPlaylist(e.target.id);
    e.preventDefault();
  });
}
