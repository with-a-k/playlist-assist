const spotifyApi = "https://api.spotify.com/v1";
const playlistAssistApi = "https://immense-coast-83178.herokuapp.com/api";

function refreshAccess() {

}

function getPlaylists(user_id, token, refresh) {
  $.ajax(`${spotifyApi}/users/${user_id}/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    dataType: 'json',
    success: displayPlaylists,
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      if (jqXHR.status === 401) {
        //This tells us our access token has expired.
        refreshAccess(refresh);
      }
    }
  });
}

function loadTracksFromPlaylist(playlistId) {
  if (playlistId !== 'none') {
    $.ajax(`${playlistAssistApi}/playlist/${playlistId}`, {
      method: 'GET',
      success: function(data) {
        console.log('data');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });
  }
}
