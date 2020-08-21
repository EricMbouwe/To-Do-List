const createTodo = (title, description, dueDate, priority) => {
  priority = priority || 'low';

<<<<<<< HEAD
  const obj = { title, description, dueDate, priority };
=======
  const setPriority = (newPriority) => priority += newPriority
>>>>>>> 96da1739cfc3cb7ffc25e72100ba3dfd376d5185

  const setPriority = (priority) => {
    obj.priority = priority;
  };

  return { obj, setPriority };
};

export default createTodo;
