import displayController from './dom';

const createProject = (e) => {
  e.preventDefault();

  const projectName = document.querySelector('.project');

  let project = projectName.value;

  displayController.projects.push(project);

  displayController.projectSelection();

  projectName.value = '';

  localStorage.setItem('projects', JSON.stringify(displayController.projects));

  console.log(displayController.projects);
};

export default createProject;
