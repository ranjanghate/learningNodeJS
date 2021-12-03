const request = require('request');

const url = 'http://api.weatherapi.com/v1/current.json?key=a22c3eacfeab4e26bbb171110211811&q=Pikachu&aqi=no'
const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/lololol.json?access_token=pk.eyJ1IjoiYXBpLXVzZXIiLCJhIjoiY2t3aTJ4dWlpMTRxZjJ2cXZ3eDR6eHR2dSJ9.VIyZMxM9djQ12C7nTR_8Lw&limit=1'

request( {url: url, json: true}, (error, response) => {
  const data = response.body;
  if (error) {
    console.log('Unable to connect');
  } else if (data.error) {
    console.log(data.error.message);
  } else {
    console.log(`It is currently ${data.current.temp_c} degrees out, There is ${data.current.precip_mm}% of chances`);
  }
});


request({url: geo_url, json: true}, (error, response) => {
  const data = response.body;
  if (error) {
    console.log('Unable to connect');
  } else if (!data.features.length) {
    console.log('Invalid location')
  } else {
    console.log('Co-ordinates for given location is ' + data.features[0].center);
  }
});

// error attribute only show OS level/ low level error
// like unable to connect to network or request failed
// To handle error generated from API you have to perform defensive programing
