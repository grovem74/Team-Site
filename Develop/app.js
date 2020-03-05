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
        message: "To start building your team, set manager info first.",
        choices: ["Manager"]
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
const questionsNoManager = [
    {
        type: "list",
        name: "role",
        message: "What is your job title?",
        choices: ["Intern", "Engineer"]
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
        type: "confirm",
        message: "Would you like to add a team member?",
        name: "addTeamMember",
    },
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function getInfo() {
    const rawInfo = await askQuestions();
    console.log("-------RAW iNFO-----")
    console.log(rawInfo)
    const classInfo = makeEmployee(rawInfo);
    const renderInfo = render(classInfo)
    console.log("-------renderInfo-----")
    console.log(renderInfo)
    fs.writeFileSync(outputPath, renderInfo, function (err) {

        if (err) {
            throw (err);
        }
    });
};

function askQuestions() {
    return inquirer.prompt(questions).then(answers => {
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        let role = answers.role;
        let school = answers.school;
        let github = answers.github;
        let officeNumber = answers.officeNumber;
        employees.push(answers);
        if (answers.addTeamMember === true) {
            if (answers.role === "Manager") {
                return askQuestionsNoManager()
            } else {
                askQuestions();
            }

        } else {
            // console.log(employees);
            return employees;
        };
    });
};

function askQuestionsNoManager() {
    return inquirer.prompt(questionsNoManager).then(answers => {
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        let role = answers.role;
        let school = answers.school;
        let github = answers.github;
        let officeNumber = answers.officeNumber;
        employees.push(answers);
        if (answers.addTeamMember === true) {
            return askQuestionsNoManager();
        } else {
            console.log(employees);
            return employees;
        };
    });
};

function makeEmployee(data) {

    return data.map(o => {
        const { id, role, name, email, school, github, officeNumber } = o;

        switch (role) {
            case 'Manager':
                return new Manager(name, id, email, officeNumber);
            case 'Intern':
                return new Intern(name, id, email, school);
            case 'Engineer':
                return new Engineer(name, id, email, github);
        }
    })
};

getInfo();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```




