const chalk = require("chalk");
const getNotes = require("./notes.js");
const yargs = require("yargs");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  handler: () => {
    console.log("Adding a new note");
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a new note",
  handler: () => {
    console.log("Removing a new note");
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
    console.log("Listing all notes");
  },
});

// add, remove, read, list

console.log("yargs", yargs.argv);
