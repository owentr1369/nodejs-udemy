const chalk = require("chalk");
const notes = require("./notes.js");
const yargs = require("yargs");
const { title } = require("process");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, // make it required
      type: "string", // make it a string
    },
    body: {
      describe: "Note body",
      demandOption: true, // make it required
      type: "string", // make it a string
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a new note",
  handler: () => {
    console.log("Reading a new note");
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler: () => {
    notes.loadNotes();
  },
});

yargs.parse();

console.log("yargs", yargs.argv);
