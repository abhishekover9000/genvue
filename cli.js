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
  .option("-r, --routes", "view current configuration routes", viewConfigRoutes)
  .option(
    "-s, --scaffold <name>",
    "scaffolds a component or page with unit tests",
    genScaffold
  )
  .option(
    "-p, --page <name>",
    "generate a page boilerplate from a name",
    genPage
  )
  .option(
    "-c, --component <name>",
    "generate a component from a name",
    genComponent
  )
  .option("-u, --unit <name>", "generate unit test from a name", genUnitTests)
  .parse(process.argv);

// Shows the help menu if nothing is listed
if (program.args.length === 0 && process.argv.length === 2) {
  console.log(program.helpInformation());
}

// sets up the routes for components and unit tests
async function setupConfig() {
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
        ? `./src/${answers.defaultComponent}`
        : fileData.componentURI;
      const finalAnswerUnit = answers.defaultUnit
        ? `./src/${answers.defaultUnit}`
        : fileData.unitURI;
      shellMagic.updateConfigFile({
        componentURI: finalAnswerComponent,
        unitURI: finalAnswerUnit
      });
    });
  return;
}

function viewConfigRoutes() {
  shellMagic.retrieveConfigFile();
  return;
}

async function genScaffold(name) {
  // exception handle routes
  const URI = shellMagic.checkFile("./vuegen_config.js");
  if (URI === "NO_URI") {
    console.log(
      "You must first set up the config with -0 to use this feature!"
    );
    return;
  }

  let componentPromise = genComponent(name);
  let unitTestPromise = genUnitTests(name);

  await componentPromise;
  await unitTestPromise;

  /*
  inquirer
    .prompt([
      {
        type: "list",
        name: "genType",
        message: "Would you like to scaffold a component or a page?",
        paginated: true,
        choices: ["component", "page"]
      }
    ])
    .then(async answers => {
      console.log(answers);
      console.log(answers.genType === "component");

      if (answers.genType === "component") {
        console.log("making component");
        await genComponent(name);
      } else {
        console.log("making page");
        await genPage(name);
      }

      await genUnitTests(name);
      return;
    });
*/
  // scaffold routes
  return;
}

function genPage(name) {
  console.log("yooo");
}

async function genComponent(name) {
  // exception handle routes
  const URI = shellMagic.checkFile("./vuegen_config.js");
  if (URI === "NO_URI") {
    console.log(
      "You must first set up the config with -0 to use this feature!"
    );
    return;
  }

  // constants
  const VUE_COMPONENT_FOLDER = "Vue component Folder";
  const VUE_COMPONENT_SINGLE = "Single page vue component";

  const entryChoices = [VUE_COMPONENT_FOLDER, VUE_COMPONENT_SINGLE];

  const extras = ["add vuex module to store folder"];

  // component generation prompt
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "genType",
      message: "What would you like to generate?",
      paginated: true,
      choices: entryChoices
    },
    {
      type: "input",
      name: "pathName",
      message:
        "What is your intended path? Leave blank for current default path"
    }
  ]);

  const path = answers.pathName ? answers.pathName : URI.componentURI;

  switch (answers.genType) {
    case VUE_COMPONENT_FOLDER:
      console.log("before magic");
      console.log(name);
      console.log(path);
      shellMagic.makeFolder(name, path);
      break;
    case VUE_COMPONENT_SINGLE:
      shellMagic.makeSingle(answers.componentName, path);
      break;
    default:
      break;
  }
  console.log("All done!");
  return;
}

async function genUnitTests(name) {
  // exception handle routes
  const URI = shellMagic.checkFile("./vuegen_config.js");
  if (URI === "NO_URI") {
    console.log(
      "You must first set up the config with -0 to use this feature!"
    );
    return;
  }

  const extras = ["vuex"];

  // component generation prompt
  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      name: "extras",
      message: "Choose anything this Vue comes with.",
      paginated: true,
      choices: extras
    }
  ]);

  shellMagic.makeUnitTests(name, URI, answers.extras);
  console.log("All done!");

  return;
}
// Main Vuegen

/**
 * Checkbox list examples
 */

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
