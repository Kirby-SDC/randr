const express = require('express');
const bodyParser = require('body-parser')
const controllers = require('./controllers')

//creates a new express app
const app = express();
app.use(bodyParser.json())

//server configuration
const PORT = 3000;
//
app.get('/reviews', controllers.getReviews)
app.get('/reviews/meta', controllers.getMetaData)

app.post('/reviews', controllers.addReview)

app.put('/reviews/:review_id/helpful', controllers.putHelpful)
app.put('/reviews/:review_id/report', controllers.putReport)

app.get("/loaderio-ede51e6f522ac08b0818b40ccf2eb4aa", (req, res) =>
 res.send("loaderio-ede51e6f522ac08b0818b40ccf2eb4aa"))

// make the server listen to requests

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
});
