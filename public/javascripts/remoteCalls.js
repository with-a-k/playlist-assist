
const spotifyApi = "https://api.spotify.com/v1";

function getPlaylists(user_id, token) {
  $.ajax(`${spotifyApi}/users/${user_id}/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    dataType: 'json',
    success: displayPlaylists,
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    }
  });
}

function displayPlaylists(playlists, resultString, jqXHR) {
  console.log(playlists);
}