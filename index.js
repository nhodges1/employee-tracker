const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { init } = require("express/lib/application");
require("console.table");

init();