const express = require('express');

const app = express();

// set up a handler for an HTTP GET request.
app.get('', (req, res) => {
  res.send('Hello express!');
});

app.get('/help', (req, res) => {
  res.send('Help page');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/info', (req, res) => {
  res.send('Info page');
});

// The last thing to do is start the server. This is done by calling app.listen with the port you
// want to listen on.
app.listen(3000, () => {
  console.log('server started');
});
