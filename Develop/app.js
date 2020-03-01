const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const questions = [
    {
        type: "list",
        name: "role",
        message: "What is your job title?",
        choices: ["Manager", "Intern", "Engineer"]
    },
    {
        type: "input",
        message: "Enter your name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter your ID:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter your email address:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter the name of your school:",
        name: "school",
        when: function (answers) {
            return answers.role === "Intern";
        }
    },
    {
        type: "input",
        message: "Enter your Github username:",
        name: "github",
        when: function (answers) {
            return answers.role === "Engineer";
        }
    },
    {
        type: "input",
        message: "Enter your office number:",
        name: "officeNumber",
        when: function (answers) {
            return answers.role === "Manager";
        }
    },
    {
        type: "confirm",
        message: "Would you like to add a team member?",
        name: "addTeamMember",
    },
];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function getInfo() {
    askQuestions();    
};

function askQuestions(){
    inquirer.prompt(questions).then(answers => {
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        let role = answers.role;
        let school = answers.school;
        let github = answers.github;
        let officeNumber = answers.officeNumber;
        employees.push(answers);
        if (answers.addTeamMember === true){
           askQuestions();
        } else {
            console.log(employees);
            createFile();
        };
    });
};

// render(employees);
const data = render(employees);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function createFile(){
    fs.writeFile(outputPath, data, function (err) {

        if (err) { 
            return console.log(err);
        }
    });
};

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

getInfo();

