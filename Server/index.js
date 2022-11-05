const express = require('express');
const bodyParser = require('body-parser')
const controllers = require('./controllers')

//creates a new express app
const app = express();
app.use(bodyParser.json())

//server configuration
const PORT = 3000;

//create a route for the app
app.get('/', (req, res)=>{
  res.send('Server connected')
});

app.get('/reviews', controllers.getReviews)
app.get('/reviews/meta', controllers.getMetaData)

app.post('/reviews', controllers.addReview)

app.put('/reviews/:review_id/helpful', controllers.putHelpful)

app.put('/reviews/:review_id/report', controllers.putReport)

// make the server listen to requests

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
});


// console.log('connected')
// console.log(req.query)
// db.query('SELECT * FROM reviews where product_id = $1', [req.query.product_id]).then(result => {
//   // res.send(result.rows)
//   let resObj = result.rows
//   resObj.map(row => {
//      db.query('SELECT url FROM photos WHERE review_id = $1', [row.id]).then(photos => {
//       photos.rows.length > 0 ? row.photos = photos.rows : null;
//       console.log(row.photos)
//     }).catch(err => {
//       console.log('error', err)
//     })
//   })
//    res.send(resObj)
//   // console.log(result.rows)
// }).catch(err => {
//   console.log('error', err)
//   res.status(404)
// })