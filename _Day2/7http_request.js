const https = require('http');
const url = 'http://api.weatherapi.com/v1/current.json?key=a22c3eacfeab4e26bbb171110211811&q=London&aqi=no';

const request = https.request(url, (response) => {
  let data = '';

  response.on('data', (chunck) => { // this function is call when data is fetching from server
    data = data + chunck.toString();
  });

  response.on('end', () => { // this function is called when request in done
    const result = JSON.parse(data);
    console.log(result);
  });
});

request.on('error', (error) => {
  console.log('an error occured', error);
}); // this function is called when there is an error in request

request.end();
