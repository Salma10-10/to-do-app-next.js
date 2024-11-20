"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Array to hold tasks
let tasks = [];
// Get the file path where tasks will be saved
const filePath = path.join(__dirname, 'tasks.json');
// Function to save tasks to the JSON file
function saveToFile() {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}
// Function to load tasks from the JSON file
function loadFromFile() {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        tasks = JSON.parse(fileData);
    }
    catch (error) {
        console.log('No existing tasks file found, starting fresh!');
    }
}
// Function to add a new task
function addTask() {
    const description = readlineSync.question('Enter task description: ');
    const priority = readlineSync.question('Enter task priority (High, Medium, Low): ').toLowerCase();
    const newTask = {
        description,
        done: false,
        createdAt: new Date(),
        priority: priority.charAt(0).toUpperCase() + priority.slice(1),
    };
    tasks.push(newTask);
    saveToFile();
    console.log('Task added!');
}
// Function to display all tasks
function displayTasks() {
    console.log('\n--- Tasks ---');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description} [${task.priority}] - ${task.done ? 'Done' : 'Not Done'}`);
    });
}
// Function to mark a task as done
function markTaskDone() {
    displayTasks();
    const taskIndex = readlineSync.questionInt('Enter the task number to mark as done: ') - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks[taskIndex].done = true;
        saveToFile();
        console.log('Task marked as done!');
    }
    else {
        console.log('Invalid task number!');
    }
}
// Function to edit a task's description or priority
function editTask() {
    displayTasks();
    const taskIndex = readlineSync.questionInt('Enter the task number to edit: ') - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const newDescription = readlineSync.question('Enter new task description: ');
        const newPriority = readlineSync.question('Enter new task priority (High, Medium, Low): ').toLowerCase();
        tasks[taskIndex].description = newDescription;
        tasks[taskIndex].priority = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);
        saveToFile();
        console.log('Task updated!');
    }
    else {
        console.log('Invalid task number!');
    }
}
// Function to delete a task
function deleteTask() {
    displayTasks();
    const taskIndex = readlineSync.questionInt('Enter the task number to delete: ') - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
        saveToFile();
        console.log('Task deleted!');
    }
    else {
        console.log('Invalid task number!');
    }
}
// Function to search tasks by description
function searchTasks() {
    const searchTerm = readlineSync.question('Enter search term: ').toLowerCase();
    const matchingTasks = tasks.filter(task => task.description.toLowerCase().includes(searchTerm));
    if (matchingTasks.length > 0) {
        console.log('\n--- Search Results ---');
        matchingTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description} [${task.priority}] - ${task.done ? 'Done' : 'Not Done'}`);
        });
    }
    else {
        console.log('No tasks found matching your search term.');
    }
}
// Function to handle the main menu
function mainMenu() {
    console.log('\nTo-Do List Application');
    console.log('1. Add Task');
    console.log('2. Display Tasks');
    console.log('3. Mark Task as Done');
    console.log('4. Edit Task');
    console.log('5. Delete Task');
    console.log('6. Search Tasks');
    console.log('7. Exit');
    const choice = readlineSync.questionInt('Choose an option: ');
    switch (choice) {
        case 1:
            addTask();
            break;
        case 2:
            displayTasks();
            break;
        case 3:
            markTaskDone();
            break;
        case 4:
            editTask();
            break;
        case 5:
            deleteTask();
            break;
        case 6:
            searchTasks();
            break;
        case 7:
            console.log('Goodbye!');
            return;
        default:
            console.log('Invalid choice!');
    }
    mainMenu();
}
// Load tasks from file and start the main menu
loadFromFile();
mainMenu();
