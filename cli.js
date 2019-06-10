#!/usr/bin/env node
const shell = require("shelljs");
const inquirer = require("inquirer");
const commander = require("commander");

const shellMagic = require("./shellMagic");

let savedData = {};

/* Create vugen shell */
const program = new commander.Command();
program
  .version("0.1.1")
  .description("Boilerplate Scaffolding Tool for VueJS Apps")
  .option("-0, --config", "configure application", setupConfig)
  .option(
    "-cr, --routes",
    "view current configuration routes",
    viewConfigRoutes
  )
  .option(
    "-s, --scaffold <name>",
    "scaffolds a component with unit tests",
    genScaffold
  )
  .option("-c, --component <name>", "component", genComponent)
  .option("-u, --unit <name>", "unit test", genUnitTests)
  .parse(process.argv);

function setupConfig() {
  const fileData = shellMagic.checkorMakeFile("./vuegen_config.js");

  inquirer
    .prompt([
      {
        type: "input",
        name: "defaultComponent",
        message:
          "What is the default path for your components from ./src/? Press enter to leave as is."
      },
      {
        type: "input",
        name: "defaultUnit",
        message:
          "What is the default path for your unit tests from ./src/? Press enter to leave as is."
      }
    ])
    .then(answers => {
      // shellMagic- set config file to these variables if the input isn't entered
      const finalAnswerComponent = answers.defaultComponent
        ? answers.defaultComponent
        : fileData.componentURI;
      const finalAnswerUnit = answers.defaultUnit
        ? answers.defaultUnit
        : answers.unitURI;
      shellMagic.updateConfigFile({
        componentURI: finalAnswerComponent,
        unitURI: finalAnswerUnit
      });
    });
}

function viewConfigRoutes() {
  shellMagic.retrieveConfigFile();
}

function genScaffold(name) {
  // check if there's routes
  // if routes,
  // else, setupConfig
}

function genComponent(name) {
  // check if there's routes
  // else, setupConfig
}

function genUnitTests(name) {
  // check if there's routes
  // else, setupConfig
}

// Main Vuegen

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
