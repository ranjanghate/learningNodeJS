// overwriting the existing data from _file.json
const fs = require('fs');

const dataBuffer = fs.readFileSync('/media/rails/New Volume/Code/LearningNode/_Day1/_json.json'); // return data is in bits form
const dataString = dataBuffer.toString();
const dataObject = JSON.parse(dataString);

dataObject.name = 'Not_Andrew';
dataObject.age = 25;
const dataWrite = JSON.stringify(dataObject);

fs.writeFileSync('/media/rails/New Volume/Code/LearningNode/_Day1/_json.json', dataWrite);
