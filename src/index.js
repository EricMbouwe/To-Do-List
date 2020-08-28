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

const projectBtn = document.getElementById('newProjectBtn');
projectBtn.addEventListener('click', displayController.displayProjectForm);

const taskBtn = document.getElementById('newTaskBtn');
taskBtn.addEventListener('click', displayController.displayTaskForm);

const cancelBtns = document.querySelectorAll('.cancel-btn');
cancelBtns.forEach((button) => {
  button.addEventListener('click', displayController.cancelSubmission);
});

displayController.populateProjectsPanel();

const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach((link) =>
  link.addEventListener('click', () => {
    displayController.addTasks(
      displayController.filterTasks(displayController.tasks, link.innerHTML)
    );
    displayController.selectedProject(link);
  })
);

window.addEventListener('load', function () {
  displayController.addTasks(displayController.tasks);
  displayController.projectSelection();

  document.querySelector('.all-tasks').addEventListener('click', function () {
    displayController.addTasks(displayController.tasks);
    displayController.selectedProject(this);
  });
});
