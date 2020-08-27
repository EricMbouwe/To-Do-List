require('./style.scss');

import createTodo from './todo';
import displayController from './dom';
const halfmoon = require('halfmoon');

halfmoon.onDOMContentLoaded();

const form = document.querySelector('.add-task');

form.addEventListener('submit', createTodo);

displayController.addTasks(displayController.tasks);
