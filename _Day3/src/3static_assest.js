const path = require('path');
const express = require('express');

const app = express();
const assetPath = path.join(__dirname, '../assets');

app.use(express.static(assetPath)); // index.html will be used for root directory so there is no need to define root directory in our application

app.listen(3000, () => {
  console.log('Server started');
});
