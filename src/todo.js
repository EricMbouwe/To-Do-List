import displayController from './dom';
const taskFormParent = document.querySelector('.task-form-parent')


const createTodo = (e) => {
  e.preventDefault();
  const getPriorityVal = () => {
    let priorityVal;
    for (let i = 0; i < displayController.priority.length; i++) {
      if (displayController.priority[i].checked)
        priorityVal = displayController.priority[i].value;
    }
    return priorityVal;
  };

  const task = {
    title: displayController.title.value,
    description: displayController.description.value,
    dueDate: displayController.dueDate.value,
    priority: getPriorityVal(),
    project:
      displayController.projectList.options[
        displayController.projectList.selectedIndex
      ].value,
  };

  displayController.tasks.push(task);
  console.log(displayController.tasks);

  localStorage.setItem('tasks', JSON.stringify(displayController.tasks));

  
  displayController.newItem(task);
  taskFormParent.classList.add('d-none')

  displayController.clearContents();

  return { task };
};

export default createTodo;
