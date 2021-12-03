const request = require('request');

const url = 'http://api.weatherapi.com/v1/current.json?key=a22c3eacfeab4e26bbb171110211811&q=London&aqi=no'

request({ url: url, json: true }, (error, response) => {
  const data = response.body
  console.log(`It is currently ${data.current.temp_c} degrees out, There is ${data.current.precip_mm}% of chances`);
});

