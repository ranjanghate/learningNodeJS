// Promises is an API provide by Node

const promiseExample = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('some_output');
    reject('failed');
  }, 2000);
});


promiseExample.then((result) => {
  console.log(result);
}).catch((status) => {
  console.log(`Your request ${status}`);
});


// Promise has three states

// Promise  --> Pending --> (failed or succeded)

// then runs the resolve call back (then is state when your promise succeded)
// catch runs the reject callback (catch is state when your promise failed)
