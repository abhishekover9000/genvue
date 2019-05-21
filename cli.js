#!/usr/bin/env node
const shell = require("shelljs");
const inquirer = require("inquirer");
const commander = require("commander");

const shellMagic = require("./shellMagic");

let savedData = {};

/* Create vugen shell */
const program = new commander.Command();
program
  .version("0.0.2")
  .description("Boilerplate Scaffolding Tool for VueJS Apps")
  .option("-0, --config", "configure application")
  .option("-1, --configs <set>", "configure application")
  .option("-s, --scaffold <name>", "scaffolds a component with unit tests")
  .option("-c, --component <name>", "component")
  .option("-u, --unit <name>", "unit test");

program.parse(process.argv);

console.log(process.argv.length);

if (program.config) {
  // check or make config file
  const fileData = shellMagic.checkorMakeFile("./vuegen_config.js");
  console.log(fileData);
  inquirer
    .prompt([
      {
        type: "input",
        name: "defaultComponent",
        message: "What is the default path for your components?"
      },
      {
        type: "input",
        name: "defaultUnit",
        message: "What is the default path for your unit tests?"
      }
    ])
    .then(answers => {
      console.log(answers);
      // shellMagic- set config file to these variables if the input isn't entered
    });
}

if (program.configs) {
  // shellMagic- return configs
  savedData = { test: "this" };
}

if (program.scaffold) {
  // inquire
  // set off
  console.log("- small pizza size");
}
if (program.component) {
  // inquire
  // shellMagic-
}
if (program.unit) {
  // shellMagic- logic and boilerplate
}

/**
 * Checkbox list examples
 */

const VUE_COMPONENT_FOLDER = "Vue component Folder";
const VUE_COMPONENT_SINGLE = "Single page vue component";

const entryChoices = [VUE_COMPONENT_FOLDER, VUE_COMPONENT_SINGLE];

const extras = ["add vuex module to store folder"];
/* COMPONENT GEN x
inquirer
  .prompt([
    {
      type: "input",
      name: "componentName",
      message: "What's the name of your component?"
    },
    {
      type: "input",
      name: "pathName",
      message: "What is your intended path? Leave blank for current root"
    },
    {
      type: "list",
      name: "genType",
      message: "What would you like to generate?",
      paginated: true,
      choices: entryChoices
    }
  ])
  .then(answers => {
    switch (answers.genType) {
      case VUE_COMPONENT_FOLDER:
        shellMagic.makeFolder(answers.componentName, answers.pathName);
        break;
      case VUE_COMPONENT_SINGLE:
        shellMagic.makeSingle(answers.componentName, answers.pathName);
        break;
      default:
        break;
    }
    console.log("All done!");
  });

  */
