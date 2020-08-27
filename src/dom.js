const displayController = (() => {
  const title = document.querySelector('.title');
  const description = document.querySelector('.description');
  const dueDate = document.getElementById('due-date');
  const priority = document.getElementsByName('priority');
  const lowPriority = document.getElementById('priority-low');
  const body = document.querySelector('body');

  const addTask = (priorityVal) => {
    const newCard = document.createElement('div');
    newCard.classList.add('w-250', 'mw-full');
    console.log(newCard);
    newCard.innerHTML = `
    <div class="card">
      <h2 class="card-title">${title.value}</h2>
      <p class="text-muted">${description.value}</p>
      <div class="text-left">${dueDate.value}</div>
      <p class="btn">${priorityVal}</p>
    </div>
    `;
    body.appendChild(newCard);
  };

  const clearContents = () => {
    title.value = '';
    description.value = '';
    dueDate.value = '';
    lowPriority.checked = true;
  };

  return { title, description, dueDate, priority, clearContents, addTask };
})();

export default displayController;
