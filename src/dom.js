const displayController = (() => {
  const title = document.querySelector('.title');
  const description = document.querySelector('.description');
  const dueDate = document.getElementById('due-date');
  const priority = document.getElementsByName('priority');
  const lowPriority = document.getElementById('priority-low');
  const projectList = document.querySelector('.project-list');
  const tasksGrid = document.querySelector('.tasks-grid');
  const projectFormParent = document.querySelector('.project-form-parent');
  const taskFormParent = document.querySelector('.task-form-parent');
  const addTaskBtn = document.querySelector('.add-task-btn');
  const updateTaskBtn = document.querySelector('.update-task-btn');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const projects = JSON.parse(localStorage.getItem('projects')) || ['General'];

  const sidebarMenu = document.querySelector('.sidebar-menu');

  const addDeleteListeners = () => {
    const deleteTask = document.querySelectorAll('.delete-task');
    deleteTask.forEach((button) => {
      button.addEventListener('click', displayController.handleDeleteTask);
    });
  };

  const addEditListeners = () => {
    const editTask = document.querySelectorAll('.edit-task');
    editTask.forEach((button) => {
      button.addEventListener('click', displayController.handleEditTask);
    });
  };

  const addTasks = (tasks) => {
    tasksGrid.innerHTML = '';
    const newCard = document.createElement('div');
    newCard.classList.add('card-container', 'mw-full');
    newCard.innerHTML = tasks
      .map(
        (task) => `
        <div class="card ${task.priority.toLowerCase()}">
          <h2 class="card-title">${task.title}</h2>
          <p class="text-muted">${task.description}</p>
          <div class="text-left">${task.dueDate}</div>
          <p>Priority: ${task.priority}</p>
          <div class="delete-task btn btn-danger">Delete</div>
          <div class="edit-task btn btn-primary">Edit</div>
        </div> 
      `,
      )
      .join('');
    tasksGrid.appendChild(newCard);
    addDeleteListeners();
    addEditListeners();
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
          <div class="edit-task btn btn-primary">Edit</div>
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
      .map((project) => `<option value="${project}">${project}</option>`)
      .join('');
  };

  const populateProjectsPanel = () => {
    projects.map((project) => {
      const projectElement = document.createElement('a');
      projectElement.classList.add('project-link', 'sidebar-link');
      projectElement.href = '#';
      projectElement.innerText = `${project}`;
      sidebarMenu.appendChild(projectElement);
      return 1;
    });
  };

  const populateSingleProject = (project) => {
    const projectElement = document.createElement('a');
    projectElement.classList.add('project-link', 'sidebar-link');
    projectElement.href = '#';
    projectElement.innerText = `${project}`;
    sidebarMenu.appendChild(projectElement);
    projectElement.addEventListener('click', () => displayController.addTasks(
      displayController.filterTasks(displayController.tasks, project),
    ));
  };

  const filterTasks = (tasks, project) => tasks.filter((task) => task.project === project);

  const displayProjectForm = () => {
    projectFormParent.classList.toggle('d-none');
  };

  const displayTaskForm = (e) => {
    taskFormParent.classList.toggle('d-none');
    if (e.srcElement.textContent === 'New task') {
      addTaskBtn.classList.remove('d-none');
      addTaskBtn.classList.add('d-inline');
    } else {
      updateTaskBtn.classList.remove('d-none');
      updateTaskBtn.classList.add('d-inline');
    }
  };

  const cancelSubmission = () => projectFormParent.classList.add('d-none')
    || taskFormParent.classList.add('d-none');
  addTaskBtn.classList.remove('d-inline');
  addTaskBtn.classList.add('d-none');
  updateTaskBtn.classList.remove('d-inline');
  updateTaskBtn.classList.add('d-none');

  const selectedProject = (project) => {
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach((link) => link.classList.remove('selected'));
    project.classList.add('selected');
  };

  const handleDeleteTask = (e) => {
    const deleteTitle = e.path[1].firstElementChild.textContent;
    const index = tasks.findIndex((item) => item.title === deleteTitle);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTasks(tasks);
  };

  const prefillForm = (e) => {
    const editCard = e.path[1].firstElementChild.textContent;
    const index = tasks.findIndex((item) => item.title === editCard);
    const editTask = tasks[index];

    const editTitle = editTask.title;
    const inputTitle = taskFormParent.querySelector('.title');
    inputTitle.value = editTitle;

    const editDescription = editTask.description;
    const inputDescription = taskFormParent.querySelector('.description');
    inputDescription.value = editDescription;

    const editDueDate = editTask.dueDate;
    const inputDueDate = taskFormParent.querySelector('#due-date');
    inputDueDate.value = editDueDate;

    const editProject = editTask.project;
    const inputProject = taskFormParent.querySelector('.project-list');
    inputProject.value = editProject;

    const editPriority = editTask.priority;
    document.querySelector(`[value="${editPriority}"]`).checked = true;

    return index;
  };

  const handleEditTask = (e) => {
    displayTaskForm(e);
    prefillForm(e);
  };

  const updateTask = () => {
    tasks.splice(prefillForm.index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTasks(tasks);
    updateTaskBtn.classList.remove('d-inline');
    updateTaskBtn.classList.add('d-none');
  };

  const handleProjectCreate = (e) => {
    e.preventDefault();

    const projectFormParent = document.querySelector('.project-form-parent');
    const projectName = document.querySelector('.project');
    const project = projectName.value;
    projects.push(project);
    projectSelection();
    populateSingleProject(project);
    projectName.value = '';
    localStorage.setItem(
      'projects',
      JSON.stringify(displayController.projects),
    );
    projectFormParent.classList.toggle('d-none');
  };

  return {
    title,
    description,
    dueDate,
    priority,
    projectList,
    addTaskBtn,
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
    handleProjectCreate,
    handleEditTask,
    addEditListeners,
    updateTask,
  };
})();

export default displayController;
