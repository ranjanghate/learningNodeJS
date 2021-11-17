const yargs = require('yargs');

// argv is the property of process

console.log(process.argv);

/* OUTPUT 
  1st is the path for nodejs executable on machine.
  2nd is the path for code path.
  3rd is the given string  
[
  '/usr/bin/node',
  '/media/rails/New Volume/Code/LearningNode/_Day1/argument_vector.js',
  'hello'
]
*/
console.log(process.argv[2]); // OUTPUT -> hello

console.log(yargs.argv);
// { _: [ 'hello' ], '$0': '_Day1/9argument_vector.js' }

console.log(yargs.argv['_']);
// ['hello']
