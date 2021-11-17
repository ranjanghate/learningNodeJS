const yargs = require('yargs');
// Yargs module is used for creating your own command-line commands in node. js and helps in generating an elegant user interface

const note = require('./Utilites/notes.js');
const chalk = require('chalk');

/* CREATING COMMANDS */

yargs.command({ // Add command
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    note.addNote(argv.title, argv.body);
  }
});

yargs.command({ // read
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    note.readNote(argv.title);
  }
})

yargs.command({ // remove
  command: 'remove',
  describe: 'Remove a note',
  bundle: {
    title: {
      describe: 'Note Title',
      demandOption: 'true',
      type: 'string'
    }
  },
  handler(argv) {
    note.removeNote(argv.title);
  }
})

yargs.command({ // list
  command: 'list',
  describe: 'Lists all note',
  handler() {
    note.listNotes();
  }
})

yargs.parse();
