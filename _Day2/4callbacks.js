// example 1
setTimeout( () => {
  console.log('First');
  setTimeout( () => {
    console.log('Second');
  }, 5000);
}, 5000);

// example 2
setTimeout( () => {
  console.log('First')
}, 5000);

setTimeout( () => {
  console.log('Second')
}, 5000);


// example 3

const geoCode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    }
    callback(data);
  }, 2000);
}

geoCode('Home', (data) => {
  console.log(data);
});

// example

const sum = (num1, num2, callback)  => {
  setTimeout(() => {
    callback(num1 + num2);
  }, 2000);
}

sum(2, 3, (ans) => {
  console.log(ans);
});
