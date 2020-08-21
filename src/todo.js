const createTodo = (title, description, dueDate, priority) => {
  priority = priority || 'low';

  const obj = { title, description, dueDate, priority };

  const setPriority = (priority) => {
    obj.priority = priority;
  };

  return { obj, setPriority };
};

export default createTodo;
