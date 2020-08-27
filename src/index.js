require('./style.scss');

import createTodo from './todo';
import displayController from './dom';
const halfmoon = require('halfmoon');

halfmoon.onDOMContentLoaded();
const work = createTodo('work', 'today', '12-2-2020', 'low');
const work2 = createTodo('work2', 'tmrw', '20-5-2010', 'high');

const getPriorityVal = () => {
  let priorityVal;
  for (let i = 0; i < displayController.priority.length; i++) {
    if (displayController.priority[i].checked)
      priorityVal = displayController.priority[i].value;
  }
  console.log(priorityVal);
};

displayController.submitBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  getPriorityVal();
});
