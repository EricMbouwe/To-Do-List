import displayController from './dom';

const createTodo = (e) => {
  e.preventDefault();
  console.log('sadegse');
  const getPriorityVal = () => {
    let priorityVal;
    for (let i = 0; i < displayController.priority.length; i++) {
      if (displayController.priority[i].checked)
        priorityVal = displayController.priority[i].value;
    }
    return priorityVal;
  };

  const obj = {
    title: displayController.title.value,
    description: displayController.description.value,
    dueDate: displayController.dueDate.value,
    priority: getPriorityVal(),
  };

  console.log(obj);

  displayController.clearContents();

  return { obj };
};

export default createTodo;
