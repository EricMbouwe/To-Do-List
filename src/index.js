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

displayController.addTasks(displayController.tasks);
