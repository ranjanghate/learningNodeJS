const validator = require('validator');
// import validator from 'validator'; NODE currently deosn't support this

console.log(validator.isEmail('ranjan.com@gmail'));
console.log(validator.isEmail('ranjan@gmail.cm'));
console.log(validator.isEmail('ranjan@gmail.com'));
