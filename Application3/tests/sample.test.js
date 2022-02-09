const add = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) {
      reject('Something Went Wrong!');
    }
    resolve(a+b);
  });
};

test('Hello World', () => {

});


// test('Fail', () => {
//   throw new Error('Failed Test');
// });

test('Async test', (done) => {
  setTimeout(() => {
    expect(2).toBe(2);
    done()
  }, 2000);
})

test('Async test with promis', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  })
})

test('Async test with async-await', async () => {
  const total = await add(2, 3);
  expect(total).toBe(5);
})

// Why test?

// - Saves times
// - Create reliable software
// - Give flexibility to developers
//   * Refactoring
//   * Collabriting
//   * Profiling
// - Peace of Mind
