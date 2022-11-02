const { Pool, Client } = require("pg");

const credentials = {
  user: "angelacarrasco",
  host: "localhost",
  database: "Reviews",
  password: "Kimbo2021am!",
  port: 5432,
};

const pool = new Pool(credentials)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
// pool.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });