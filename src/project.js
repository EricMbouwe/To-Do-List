import displayController from './dom';

const projectFormParent = document.querySelector('.project-form-parent');

const createProject = (e) => {
  e.preventDefault();

  const projectName = document.querySelector('.project');

  let project = projectName.value;

  displayController.projects.push(project);

  displayController.projectSelection();
  displayController.populateSingleProject(project);

  projectName.value = '';

  localStorage.setItem('projects', JSON.stringify(displayController.projects));

  projectFormParent.classList.toggle('d-none');

  console.log(displayController.projects);
};

export default createProject;
