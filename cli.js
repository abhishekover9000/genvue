#!/usr/bin/env node
const shell = require("shelljs");
const inquirer = require("inquirer");
const commander = require("commander");

const shellMagic = require("./shellMagic");

let savedData = {};

/* Create vugen shell */
const program = new commander.Command();
program
  .version("0.1.3")
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
          "What is the default path for your unit tests from ./tests/? Press enter to leave as is."
      },

      {
        type: "input",
        name: "defaultPage",
        message:
          "What is the default path for your pages from ./src/? Press enter to leave as is."
      }
    ])
    .then(answers => {
      // shellMagic- set config file to these variables if the input isn't entered
      const finalAnswerComponent = answers.defaultComponent
        ? `./src/${answers.defaultComponent}`
        : fileData.componentURI;
      const finalAnswerUnit = answers.defaultUnit
        ? `./tests/${answers.defaultUnit}`
        : fileData.unitURI;
      const finalAnswerPage = answers.defaultPage
        ? `./src/${answers.defaultPage}`
        : fileData.pageURI;

      shellMagic.updateConfigFile({
        componentURI: sanitizeRoute(finalAnswerComponent),
        unitURI: sanitizeRoute(finalAnswerUnit),
        pageURI: sanitizeRoute(finalAnswerPage)
      });
    });
  return;
}

// takes in a string and returns a string that adheres to the './{route}/' convention
function sanitizeRoute(route) {
  if (!route) return route;
  if (route[route.length - 1] === "/") return route;
  return `${route}/`;
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

  // constants
  const VUE_COMPONENT_FOLDER = "Vue component Folder";
  const VUE_COMPONENT_SINGLE = "Single page vue component";

  const entryChoices = [VUE_COMPONENT_FOLDER, VUE_COMPONENT_SINGLE];

  const extras = ["add vuex module to store folder"];

  // component generation prompt
  const answers = await inquirer
    .prompt([
      {
        type: "list",
        name: "pageOrComponent",
        message: "Are you generating a page or a component?",
        paginated: true,
        choices: ["page", "component"]
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
        name: "extras",
        message: "Choose any additional integrations to your test cases",
        paginated: true,
        choices: extras
      }
    ])
    .then(async answers => {
      console.log("page or comp");
      console.log(answers.pageOrComponent);
      switch (answers.genType) {
        case VUE_COMPONENT_FOLDER:
          shellMagic.makeFolder(name, URI, answers.pageOrComponent);
          break;
        case VUE_COMPONENT_SINGLE:
          shellMagic.makeSingle(
            answers.componentName,
            URI,
            answers.pageOrComponent
          );
          break;
        default:
          break;
      }
      shellMagic.makeUnitTests(name, URI, answers.extras);
    });

  return;
}

// NOTE- any change to genPage means we must change genScaffold
async function genPage(name) {
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
    }
  ]);

  switch (answers.genType) {
    case VUE_COMPONENT_FOLDER:
      shellMagic.makeFolder(name, URI, "page");
      break;
    case VUE_COMPONENT_SINGLE:
      shellMagic.makeSingle(answers.componentName, URI, "page");
      break;
    default:
      break;
  }

  console.log("All done!");
  return;
}

// NOTE- any change to genComponent means we must change genScaffold
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
    }
  ]);

  const path = answers.pathName ? answers.pathName : URI.componentURI;

  switch (answers.genType) {
    case VUE_COMPONENT_FOLDER:
      shellMagic.makeFolder(name, URI, "component");
      break;
    case VUE_COMPONENT_SINGLE:
      shellMagic.makeSingle(answers.componentName, URI, "component");
      break;
    default:
      break;
  }

  console.log("All done!");
  return;
}

// NOTE- any change to genComponent means we must change genScaffold

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
      message: "Choose any additional integrations to your test cases.",
      paginated: true,
      choices: extras
    }
  ]);

  shellMagic.makeUnitTests(name, URI, answers.extras);
  console.log("All done!");

  return;
}
