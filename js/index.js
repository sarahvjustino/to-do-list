const taskInput = document.getElementById('input-task');
const addButton = document.getElementById('addButton');
const taskContainer = document.querySelector('.tasks-container');
const empty = taskContainer.querySelector('.tasks-container-empty');

addButton.addEventListener('click', createTask);

function createTask() {
  empty.classList.add('hide')
  if (taskInput.value == '') {
    return
  }

  const task = document.createElement('div');

  task.classList.add('task');
  task.innerHTML = `
          <div class="task-content">
          ${taskInput.value}
          </div>
      
          <div class="task-buttons">
            <button class="task-button btnCheck">
            <i class="fa-solid fa-check"></i>
            </button>
            <button class="task-button btnEdit">
            <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="task-button btnDelete">
            <i class="fa-sharp fa-solid fa-trash"></i>
            </button>
          </div>
          `
  taskContainer.appendChild(task);
  taskInput.value = '';
  taskInput.focus();

  const checkButton = document.querySelectorAll('.btnCheck');
  const editButton = document.querySelectorAll('.btnEdit');
  const deleteButton = document.querySelectorAll('.task-button.btnDelete');

  checkButton.forEach(button => {
    button.addEventListener('click', checkTask);
  })



  deleteButton.forEach(button => {
    button.addEventListener('click', deleteTask);
  });
}

function checkTask() {
  const taskContent = document.querySelector('.task-content');

  taskContent.style.textDecoration = 'line-through';
}

function deleteTask() {
  this.parentNode.parentNode.remove()
}