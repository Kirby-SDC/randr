const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let someSchema = mongoose.Schema({
  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', someSchema);
  //creates a model based of the schema provided