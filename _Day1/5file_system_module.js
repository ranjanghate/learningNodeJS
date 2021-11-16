// The file system allow use to access the operating system's File System.
// We will able to read, write, append files and figure out if a given directory exists or not.

const fs = require('fs');

// writing a file in sync
fs.writeFileSync('_file.txt', 'This file is created by Nodejs. ');

// if you write the fs object again it will rewrite the existing contain with given text.

// append the new data with the existing data written in file
fs.appendFileSync('_file.txt', 'Appending text to the file.txt');
