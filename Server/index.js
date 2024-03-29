const express = require("express");
const bodyParser = require("body-parser");
const controllers = require("./controllers");
require("dotenv").config();

//creates a new express app
const app = express();
app.use(bodyParser.json());

//server configuration
const PORT = 3000;
//
app.get("/reviews", controllers.getReviews);
app.get("/reviews/meta", controllers.getMetaData);

app.post("/reviews", controllers.addReview);

app.put("/reviews/:review_id/helpful", controllers.putHelpful);
app.put("/reviews/:review_id/report", controllers.putReport);

app.get(`/${process.env.loaderio}`, (req, res) =>
  res.send(`${process.env.loaderio}`)
);

// make the server listen to requests

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
