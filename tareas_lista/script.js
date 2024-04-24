const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const trashBin = document.getElementById('trashBin');
const trashList = document.getElementById('trashList');

// Cargar tareas desde el localStorage al cargar la página
window.onload = loadTasks;

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
    });

    const savedTrash = JSON.parse(localStorage.getItem('trash')) || [];
    savedTrash.forEach(trashText => {
        const trashItem = createTaskItem(trashText);
        sendToTrash(trashItem);
    });
}

function createTaskItem(text) {
    const taskItem = document.createElement('li');
    taskItem.textContent = text;
    taskItem.onclick = toggleCompleted;
    return taskItem;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        saveTasks();
        taskInput.value = '';
    }
}

function toggleCompleted() {
    this.classList.toggle('completed');
    if (this.classList.contains('completed')) {
        sendToTrash(this);
    } else {
        saveTasks();
    }
}

function clearCompleted() {
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => {
        sendToTrash(task);
    });
}

function emptyTrash() {
    trashBin.innerHTML = '';
    localStorage.removeItem('trash');
}

function sendToTrash(taskItem) {
    taskItem.onclick = null; // Remove onclick listener
    trashBin.appendChild(taskItem);
    saveTrash();
    saveTasks();
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(taskItem => taskItem.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTrash() {
    const trash = Array.from(trashBin.children).map(trashItem => trashItem.textContent);
    localStorage.setItem('trash', JSON.stringify(trash));
}