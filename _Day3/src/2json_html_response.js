const express = require('express');

const app = express();

app.get('', (req, res) => {
  res.send('Root');
});

app.get('/html', (req, res) => {
  res.send('<h1> Hello All </h1> <div> Welcome ! </div');
});

app.get('/info', (req, res) => {
  res.send({
    name: 'lokesh',
    age: 14 
  }); // it will automaticaly stringify the json
});

app.listen(3000, () => {
  console.log('server started')
});
