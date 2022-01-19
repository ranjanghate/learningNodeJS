// This means that Javascript will make sure that the asnycFn will return with a Promise (either resolved or rejected)
// even if an error occured in it, in our case calling our .catch() block.

// However with the fn function the engine doesn't yet know that the function will return a Promise and thus 
// it will not call our catch() block.


  const add = (a, b) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (a < 0 || b < 0) {
          reject('Something Went Wrong!');
        }
        resolve(a+b);
      }, 2000)
    });
  };


const doSomething = async () => {
  // throw new Error;
  const sum = await add(2, 15);
  const sum2 = await add(2, sum);
  // const sum3 = await add(-12, sum2);
    // if promise fails the functions stops after that

  const sum3 = await add(12, sum2);

  return sum3;
}


doSomething().then((result) => console.log(result)).catch((e) => console.log(e));
