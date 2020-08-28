const displayController = (() => {
  const title = document.querySelector('.title');
  const description = document.querySelector('.description');
  const dueDate = document.getElementById('due-date');
  const priority = document.getElementsByName('priority');
  const lowPriority = document.getElementById('priority-low');
  const container = document.querySelector('.container');
  const projectList = document.querySelector('.project-list');
  const projectsGrid = document.querySelector('.projects-grid');
  const tasksGrid = document.querySelector('.tasks-grid');
  const projectFormParent = document.querySelector('.project-form-parent');
  const taskFormParent = document.querySelector('.task-form-parent');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const projects = JSON.parse(localStorage.getItem('projects')) || ['General'];

  const sidebarMenu = document.querySelector('.sidebar-menu');

  const addTasks = (tasks) => {
    tasksGrid.innerHTML = '';
    const newCard = document.createElement('div');
    newCard.classList.add('card-container', 'mw-full');
    newCard.innerHTML = tasks
      .map((task) => {
        return `
        <div class="card ${task.priority.toLowerCase()}">
          <h2 class="card-title">${task.title}</h2>
          <p class="text-muted">${task.description}</p>
          <div class="text-left">${task.dueDate}</div>
          <p>Priority: ${task.priority}</p>
          <div class="delete-task btn btn-danger">Delete</div>
        </div> 
      `;
      })
      .join('');
    tasksGrid.appendChild(newCard);
    addDeleteListeners();
  };

  const addDeleteListeners = () => {
    const deleteTask = document.querySelectorAll('.delete-task');
    deleteTask.forEach((button) => {
      button.addEventListener('click', displayController.handleDeleteTask);
    });
  };

  const newItem = (task) => {
    const newCard = document.createElement('div');
    newCard.classList.add('card-container', 'mw-full');
    newCard.innerHTML = `
        <div class="card ${task.priority.toLowerCase()}">
          <h2 class="card-title">${task.title}</h2>
          <p class="text-muted">${task.description}</p>
          <div class="text-left">${task.dueDate}</div>
          <p>Priority: ${task.priority}</p>
          <div class="delete-task btn btn-danger">Delete</div>
        </div>
      `;
    tasksGrid.appendChild(newCard);
  };

  const clearContents = () => {
    title.value = '';
    description.value = '';
    dueDate.value = '';
    lowPriority.checked = true;
  };

  const projectSelection = () => {
    projectList.innerHTML = projects
      .map((project) => {
        return `<option value="${project}">${project}</option>`;
      })
      .join('');
  };

  const populateProjectsPanel = () => {
    projects.map((project) => {
      const projectElement = document.createElement('a');
      projectElement.classList.add('project-link', 'sidebar-link');
      projectElement.href = '#';
      projectElement.innerText = `${project}`;
      sidebarMenu.appendChild(projectElement);
    });
  };

  const populateSingleProject = (project) => {
    const projectElement = document.createElement('a');
    projectElement.classList.add('project-link', 'sidebar-link');
    projectElement.href = '#';
    projectElement.innerText = `${project}`;
    sidebarMenu.appendChild(projectElement);
    projectElement.addEventListener('click', () =>
      displayController.addTasks(
        displayController.filterTasks(displayController.tasks, project)
      )
    );
  };

  const filterTasks = (tasks, project) => {
    return tasks.filter((task) => task.project == project);
  };

  const displayProjectForm = () => {
    projectFormParent.classList.toggle('d-none');
  };

  const displayTaskForm = () => {
    taskFormParent.classList.toggle('d-none');
  };

  const cancelSubmission = () => {
    projectFormParent.classList.add('d-none') ||
      taskFormParent.classList.add('d-none');
  };

  const selectedProject = (project) => {
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach((link) => link.classList.remove('selected'));
    project.classList.add('selected');
  };

  const handleDeleteTask = (e) => {
    let deleteTitle = e.path[1].firstElementChild.textContent;
    let index = tasks.findIndex((item) => item.title == deleteTitle);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTasks(tasks);
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
    populateProjectsPanel,
    projects,
    projectSelection,
    displayProjectForm,
    displayTaskForm,
    cancelSubmission,
    filterTasks,
    populateSingleProject,
    selectedProject,
    handleDeleteTask,
    addDeleteListeners,
  };
})();

export default displayController;
