require('./style.scss');

import createTodo from './todo';
import displayController from './dom';
import createProject from './project';
const halfmoon = require('halfmoon');

halfmoon.onDOMContentLoaded();

const addTaskForm = document.querySelector('.add-task');
addTaskForm.addEventListener('submit', createTodo);

const addProjectForm = document.querySelector('.add-project');
addProjectForm.addEventListener('submit', createProject);

const projectBtn = document.getElementById('newProjectBtn')
projectBtn.addEventListener('click', displayController.displayProjectForm)

const taskBtn = document.getElementById('newTaskBtn')
taskBtn.addEventListener('click', displayController.displayTaskForm)

const cancelBtns = document.querySelectorAll('.cancel-btn')
cancelBtns.forEach(button => {
  button.addEventListener('click', displayController.cancelSubmission)
})

displayController.addTasks(displayController.tasks);
