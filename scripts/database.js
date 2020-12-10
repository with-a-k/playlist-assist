const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

async function findOrCreateUser(spotify_id) {
  console.log(spotify_id);

  if (spotify_id == "" || typeof spotify_id === undefined) {
    console.log('No ID provided.');
  }

  const select = "SELECT id FROM users WHERE spotify_id = $1";
  const params = [spotify_id];

  pool.query(select, params, function(err, result) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      return 0;
    }

    console.log('Got results.');
    console.log(JSON.stringify(result.rows));

    if (result.rows.length === 0) {
      const insert = "INSERT INTO users (spotify_id) VALUES ($1)";
      pool.query(insert, params, function(err, insertion) {
        if (err) {
          console.log('Query error!');
          console.log(err);
          return 0;
        }

        console.log('Inserted.');
        console.log(insertion);
        return insertion;
      });
    } else {
      return 0;
    }
  });

}

function updateUserTokens(id, access, refresh) {
  const updateAccess = "UPDATE users SET access_token = $2 WHERE id = $1";
  const updateRefresh = "UPDATE users SET refresh_token = $3 WHERE id = $1";
  const params = [id, access, refresh];

  pool.query(updateAccess, params, function(err, access) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      return 500;
    }
    return 200;
  });

  pool.query(updateRefresh, params, function(err, access) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      return 500;
    }
    return 200;
  });
}

module.exports = { findOrCreateUser, updateUserTokens };
