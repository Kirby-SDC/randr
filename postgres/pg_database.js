const { Pool, Client } = require("pg");
require('dotenv').config()

const credentials = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
};

const pool = new Pool(credentials)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});