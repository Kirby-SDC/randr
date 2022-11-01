const express = require('express');

//creates a new express app
const app = express();

//server configuration
const PORT = 3001;

//create a route for the app
app.get('/', (req, res)=>{
  res.send('Hello World')
});

// make teh server listen ot requests

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
});
