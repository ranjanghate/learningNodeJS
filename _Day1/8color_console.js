const chalk = require('chalk');

console.log(chalk.green('Success!'));
console.log(chalk.bgGreen('Success! inverse'));
console.log(chalk.bgRed.white.bold('Success! inverse'));

console.log(chalk.bgGreen.bold('Success! inverse'));
