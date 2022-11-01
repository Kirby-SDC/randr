const express = require('express');

//creates a new express app
const app = express();

//server configuration
const PORT = 5432;

//create a route for the app
app.get('/', (req, res)=>{
  res.send('Server connected')
});

// make teh server listen ot requests

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
});
