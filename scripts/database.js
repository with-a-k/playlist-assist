const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function findOrCreateUser(spotify_id, callback) {
  console.log(spotify_id);
  const select = "SELECT id FROM users WHERE spotify_id = $1::text";
  const params = [spotify_id];

  pool.query(select, params, function(err, result) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      callback(err, null);
    }

    console.log('Got results.');
    console.log(JSON.stringify(result.rows));
  });

}

function updateUserTokens(id, access, refresh) {

}

module.exports = { findOrCreateUser, updateUserTokens };
