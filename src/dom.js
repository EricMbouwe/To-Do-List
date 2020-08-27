const displayController = (() => {
  const title = document.querySelector('.title');
  const description = document.querySelector('.description');
  const dueDate = document.getElementById('due-date');
  const priority = document.getElementsByName('priority');
  const submitBtn = document.querySelector('.submit');

  return { title, description, dueDate, priority, submitBtn };
})();

export default displayController;
