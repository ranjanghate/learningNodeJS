// Getting co-ordinates from address

const request = require('request');

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXBpLXVzZXIiLCJhIjoiY2t3aTJ4dWlpMTRxZjJ2cXZ3eDR6eHR2dSJ9.VIyZMxM9djQ12C7nTR_8Lw&limit=1'

request({url: url, json: true}, (error, response) => {
  const data = response.body;
  console.log('Co-ordinates for given location is ' + data.features[0].center);
});
