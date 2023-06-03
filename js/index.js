const taskInput = document.getElementById('input-task');
const addButton = document.getElementById('addButton');
const taskContainer = document.querySelector('.tasks-container');
const empty = taskContainer.querySelector('.tasks-container-empty');

addButton.addEventListener('click', createTask);

function createTask() {
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

  editButton.forEach(button => {
    button.addEventListener('click', editTask);
  })

  updateEmptyMessage();
}

function checkTask() {
  const taskContent = this.parentNode.previousElementSibling;

  taskContent.style.textDecoration === 'line-through' ? taskContent.style.textDecoration = 'none' : taskContent.style.textDecoration = 'line-through';
}

function deleteTask() {
  const task = this.parentNode.parentNode;
  task.remove();
  updateEmptyMessage();
}

function editTask() {
  const task = this.parentNode.parentNode;
  const taskContent = task.querySelector('.task-content');

  taskContent.setAttribute('contenteditable', true);
  taskContent.focus();

  taskContent.addEventListener('keydown', handleKeyDown);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      taskContent.blur();
    }
  }

  taskContent.addEventListener('blur', saveEditedTask);

  function saveEditedTask() {
    taskContent.setAttribute('contenteditable', false);
    taskContent.removeEventListener('keydown', handleKeyDown);
    taskContent.removeEventListener('blur', saveEditedTask);
  }
}

function updateEmptyMessage() {
  if (taskContainer.children.length === 0) {
    empty.classList.remove('hide');
  } else {
    empty.classList.add('hide');
  }
}