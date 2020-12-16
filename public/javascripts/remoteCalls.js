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
        showTrackSelector(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
          //This tells us our access token has expired.
          refreshAccess(refresh);
        }
      }
    });
  } else {
    showTrackSelector([]);
  }
}

function getAnalysis() {
  console.log($('.track-added'));
  let tracks = $('.track-added');
  let tracksData = Object.keys($('.track-added')).map(function(key) {
    if (isNaN(parseInt(key))) {
      return;
    }
    track = tracks[key];
    console.log(track.children);
    trackName = track.children.item(0).innerHTML;
    artistList = track.children.item(1).innerHTML.slice(9);
    albumName = track.children.item(2).innerHTML.slice(7);
    return {
      id: track.id,
      trackName: trackName,
      artistList: artistList,
      albumName: albumName
    }
  });
  if (tracksData.length > 100) {
    alert('Maximum of 100 tracks. You have ' + tracksData.length);
    return;
  }
  console.log(tracksData);
  $.ajax(`${playlistAssistApi}/analysis`, {
    method: 'GET',
    data: tracksData,
    success: function(data) {
      console.log('Got return from API analysis');
      //window.location = 'https://immense-coast-83178.herokuapp.com/analysis';
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        //This tells us our access token has expired.
        refreshAccess(refresh);
      }
    }
  })
}
