const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

async function findOrCreateUser(spotify_id, callback) {
  if (spotify_id == "" || typeof spotify_id === undefined) {
    console.log('No ID provided.');
  }

  const select = "SELECT id FROM users WHERE spotify_id = $1";
  const params = [spotify_id];

  pool.query(select, params, function(err, result) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      callback(0);
    }

    console.log('Got results.');
    console.log(JSON.stringify(result.rows));

    if (result.rows.length === 0) {
      const insert = "INSERT INTO users (spotify_id) VALUES ($1)";
      console.log('Inserting...');
      pool.query(insert, params, function(err, insertion) {
        if (err) {
          console.log('Query error!');
          console.log(err);
          callback(0);
        }

        console.log('Inserted.');
        console.log(insertion);
        callback(insertion.insertId);
      });
    } else {
      callback(result.rows[0].id);
    }
  });

}

function updateUserTokens(id, access, refresh) {
  console.log('User ID: ' + id);
  const updateAccess = "UPDATE users SET access_token = $2 WHERE id = $1";
  const updateRefresh = "UPDATE users SET refresh_token = $2 WHERE id = $1";
  const accessParams = [id, access];
  const refreshParams = [id, refresh];

  pool.query(updateAccess, accessParams, function(err, access) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      return 500;
    }
    return 200;
  });

  pool.query(updateRefresh, refreshParams, function(err, access) {
    if (err) {
      console.log('Query error!');
      console.log(err);
      return 500;
    }
    return 200;
  });
}

function retrieveUserTokens(spotify_id) {
  if (spotify_id == "" || typeof spotify_id === undefined) {
    console.log('No ID provided.');
  }

  const select = "SELECT access_token, refresh_token FROM users WHERE spotify_id = $1";
  const params = [spotify_id];

  pool.query(select, params, function(err, result) {
    if (err) {
      console.log('Query error!');
      console.log(err);
    } else {
      console.log(result);
      return result;
    }
  });
}

module.exports = { findOrCreateUser, updateUserTokens };
