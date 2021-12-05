const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Path for express configuration
const assetPath = path.join(__dirname, '../assets');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebar setup for express config 
app.set('view engine', 'hbs'); // default directory to look for html file is /views
app.set('views', viewsPath); // custom folder for hbs instead of views
hbs.registerPartials(partialsPath); // to setup partials

// Static directory
app.use(express.static(assetPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    author: 'Lokesh'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    author: 'Lokesh'
  })
});

// This request runs when path doesn't match with above requests
app.get('*', (req, res) => {
  res.send('404 No Page Found.')
});

app.listen(3000, () => {
  console.log('Server Started');
});
