const createTodo = (title, description, dueDate, priority) => {
  const obj = {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    setPriority: function () {
      if (this.priority !== undefined) {
        return (this.priority = this.priority);
      } else {
        return (this.priority = 'low');
      }
    },
  };

  return { obj };
};

export default createTodo;
