const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function findOrCreateUser(spotify_id, callback) {
  console.log(spotify_id);

  if (spotify_id == "") {
    console.log('No ID provided.');
  }

  const select = "SELECT id FROM users WHERE spotify_id = $1";
  const params = [spotify_id];

  pool.query(select, params, function(err, result) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      callback(err, null);
    }

    console.log('Got results.');
    console.log(JSON.stringify(result.rows));

    if (result.rows.length === 0) {
      const insert = "INSERT INTO users (spotify_id) VALUES ($1)";
      pool.query(insert, params, function(err, result) {
        if (err) {
          console.log('Query error!');
          console.log(err);
          callback(err, null);
        }

        console.log('Inserted.');
      });
    } else {
      callback();
    }
  });

}

function updateUserTokens(id, access, refresh) {

}

module.exports = { findOrCreateUser, updateUserTokens };
