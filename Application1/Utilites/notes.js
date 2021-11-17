const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const note = loadNote();
   
  const duplicateNote = note.find((element) => element.title === title );

  if(duplicateNote === undefined) {
    note.push({
      title: title,
      body: body
    });
    saveNotes(note);
    console.log(chalk.bgGreen('Note Saved'));
  } else {
    console.log(chalk.bgRed('Note with same title is already present, can\'t save duplicate'));
  }
}

const removeNote = (title) => {
  const notes = loadNote();
  const new_notes = notes.filter((note) => note.title !== title);
  if(notes.length === new_notes.length){
    console.log(chalk.bgRed('No Note found with title: ' + title));
  } else {
    saveNotes(new_notes);
    console.log(chalk.bgGreen('Note Removed'));
  }
}

const readNote = (title) =>  {
  const notes = loadNote();
  const note = notes.find((element) => element.title === title);

  if(note !== undefined) {
    console.log(chalk.blue.bold(note.title));
    console.log(chalk.green(note.body));
  } else {
    console.log(chalk.red('No note found'));
  }
}

const listNotes = () => {
  const notes = loadNote();

  notes.forEach((element) => {
    console.log(chalk.bold.red(element.title));
  });
}

const saveNotes = (note) => {
  const noteJSON = JSON.stringify(note);
  fs.writeFileSync('Application1/note.json', noteJSON);
}

const loadNote = () => {
  try {
    const dataBuffer = fs.readFileSync('Application1/note.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch(e) {
    return [];
  }
}

module.exports = {
  addNote: addNote,
  readNote: readNote,
  removeNote: removeNote,
  listNotes: listNotes
}
