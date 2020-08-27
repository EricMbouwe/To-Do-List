const displayController = (() => {
  const title = document.querySelector('.title');
  const description = document.querySelector('.description');
  const dueDate = document.getElementById('due-date');
  const priority = document.getElementsByName('priority');
  const lowPriority = document.getElementById('priority-low');
  const container = document.querySelector('.container');
  const projectList = document.querySelector('.project-list');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const projects = JSON.parse(localStorage.getItem('projects')) || ['General'];

  const addTasks = (tasks) => {
    const newCard = document.createElement('div');
    newCard.classList.add('w-250', 'mw-full');
    newCard.innerHTML = tasks
      .map((task) => {
        return `
        <div class="card">
          <h2 class="card-title">${task.title}</h2>
          <p class="text-muted">${task.description}</p>
          <div class="text-left">${task.dueDate}</div>
          <p class="btn">${task.priority}</p>
          <p class="text-muted">Project: ${task.project}</p>
        </div>
      `;
      })
      .join('');
    container.appendChild(newCard);
  };

  const newItem = (task) => {
    const newCard = document.createElement('div');
    newCard.classList.add('w-250', 'mw-full');
    newCard.innerHTML = `
        <div class="card">
          <h2 class="card-title">${task.title}</h2>
          <p class="text-muted">${task.description}</p>
          <div class="text-left">${task.dueDate}</div>
          <p class="btn">${task.priority}</p>
          <p class="text-muted">Project: ${task.project}</p>
        </div>
      `;
    container.appendChild(newCard);
  };
  tasks;

  const clearContents = () => {
    title.value = '';
    description.value = '';
    dueDate.value = '';
    lowPriority.checked = true;
  };

  const projectSelection = () => {
    projectList.innerHTML = projects
      .map((project) => {
        return `
      <option value="${project}">${project}</option>
    `;
      })
      .join('');
  };

  return {
    title,
    description,
    dueDate,
    priority,
    projectList,
    clearContents,
    addTasks,
    tasks,
    newItem,
    projects,
    projectSelection,
  };
})();

export default displayController;
