const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const teamMembers = [];

function promptsManager() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: "Enter the Team Manager's Name:"
        },
        {
          type: 'input',
          name: 'id',
          message: "Enter the Team Manager's Employee ID:"
        },
        {
          type: 'input',
          name: 'email',
          message: "Enter the Team Manager's Email:"
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: "Enter the Team Manager's office number:"
        },
      ])
      .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        generateHTML();       
      });
  }

function promptsEngineer() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the Engineer's Name:"
      },
      {
        type: 'input',
        name: 'ID',
        message: "Enter the Engineer's ID:"
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the Engineer's Email:"
      },
      {
        type: 'input',
        name: 'gitHub',
        message: "Enter the Engineer's GitHub Username:"
      }
    ])
    .then((answers) => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      teamMembers.push(engineer);
      //generateHTML();       
    });
}

function promptsIntern() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the Intern's Name:"
      },
      {
        type: 'input',
        name: 'ID',
        message: "Enter the Intern's ID:"
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the Intern's Email:"
      },
      {
        type: 'input',
        name: 'school',
        message: "Enter the Intern's School's Name:"
      }
    ])
    .then((answers) => {
      const intern = new Engineer(answers.name, answers.id, answers.email, answers.school);
      teamMembers.push(intern);
      //generateHTML();       
    });
}

  function generateHTML() {
    const renderedHTML = render(teamMembers);
  
   if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
   }    
    fs.writeFileSync(outputPath, renderedHTML);
  
    console.log(`Team HTML generated at ${outputPath}`);
  }
  
    promptsManager();