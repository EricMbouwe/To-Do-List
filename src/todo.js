const Todo = (title, description, dueDate, init) => {
  let priority = init * 2

  const setPriority = (newPriority) => priority += newPriority

  const getTitle = () => title;

  return { priority, title, description, dueDate, setPriority, getTitle }
}


const work = Todo('work', 'today', '12-2-2020', 2)
work.setPriority(10)


console.log(work);
console.log(work.priority);
console.log(work.getTitle());

export default Todo
