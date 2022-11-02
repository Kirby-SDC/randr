const express = require('express');
const bodyParser = require('body-parser')
const db = require('../postgres/pg_database')

//creates a new express app
const app = express();
app.use(bodyParser.json())

//server configuration
const PORT = 3000;

//create a route for the app
app.get('/', (req, res)=>{
  res.send('Server connected')
});

app.get('/reviews', (req, res, next) => {
  console.log('connected')
  db.query('SELECT * FROM reviews LIMIT 10', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result)
  })
})

// make the server listen to requests

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
});
