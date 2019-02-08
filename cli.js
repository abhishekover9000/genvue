#!/usr/bin/env node
const shell = require("shelljs");
const inquirer = require("inquirer");

const shellMagic = require("./shellMagic");
/**
 * Checkbox list examples
 */

const VUE_COMPONENT_FOLDER = "Vue component Folder";
const VUE_COMPONENT_SINGLE = "Single page vue component";

const entryChoices = [VUE_COMPONENT_FOLDER, VUE_COMPONENT_SINGLE];

const extras = ["add vuex module to store folder"];

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
    },
    {
      type: "checkbox",
      name: "extra",
      message: "Anything else:",
      paginated: true,
      choices: extras
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
