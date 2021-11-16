//require('./_utils.js');
const data_from_utils = require('./_utils.js');

console.log('main file');

// console.log(data); 
// the data is defined is utils.js and it will not work here, because all of your files which you can refer to as module 
// have their own scope, so '_utils.js' has it's own scope with its variable and 'main file' has it's own scope with its variable

// WE USE MODULE.EXPORT IN MODULE FILE TO GET DATA FROM MODULE

console.log(data_from_utils); 
