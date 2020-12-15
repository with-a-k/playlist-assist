
const spotifyApi = "https://api.spotify.com/v1";
const playlistAssistApi = "";

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
        function refreshAccess(refresh);
      }
    }
  });
}

function displayPlaylists(playlists, resultString, jqXHR) {
  console.log(playlists);
}
