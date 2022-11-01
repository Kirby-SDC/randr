const { Pool, Client } = require("pg");

const credentials = {
  user: "angelacarrasco",
  host: "localhost",
  database: "testing",
  password: "Kimbo2021am!",
  port: 5432,
};

const client = new Client(credentials)

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});