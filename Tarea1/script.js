// Referencias iniciales
const newTaskInput = document.querySelector("#new-task input"); // Referencia al campo de entrada para ingresar nuevas tareas
const tasksDiv = document.querySelector("#tasks"); // Referencia al contenedor donde se mostrarán las tareas
let deleteTasks; // Variable para almacenar las referencias a los botones de eliminación de tareas
let tasks; // Variable para almacenar las tareas
let count; // Variable para contar la cantidad de tareas

// Función al cargar la ventana
window.onload = () => {
  // Al cargar la ventana, obtener la cantidad de tareas almacenadas en el almacenamiento local y mostrarlas
  count = Object.keys(localStorage).length;
  displayTasks();
};

// Función para mostrar las tareas
const displayTasks = () => {
  // Mostrar el contenedor de tareas si hay tareas almacenadas, ocultarlo si no hay tareas
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }

  // Borrar todas las tareas existentes
  tasksDiv.innerHTML = "";

  // Obtener todas las claves (nombres de tareas) en el almacenamiento local y ordenarlas
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  // Iterar sobre cada tarea almacenada
  for (let key of tasks) {
    // Crear un div para la tarea
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    // Obtener el nombre de la tarea desde la clave y agregarlo al div como texto
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span> `;
    // Agregar un botón de eliminación para la tarea
    taskInnerDiv.innerHTML += `<button class="delete" name="eliminar"> X </button>`;
    // Agregar el div de la tarea al contenedor de tareas
    tasksDiv.appendChild(taskInnerDiv);
  }

  // Tareas completadas
  tasks = document.querySelectorAll(".task");
  tasks.forEach((element, index) => {
    // Configurar un controlador de clic para cada tarea
    element.onclick = () => {
      // Actualizar el estado de la tarea en el almacenamiento local al hacer clic en ella
      if (element.classList.contains("completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    };
  });

  // Eliminar tareas
  deleteTasks = document.getElementsByClassName("delete");
  Array.from(deleteTasks).forEach((element, index) => {
    // Configurar un controlador de clic para cada botón de eliminación
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      // Eliminar la tarea del almacenamiento local y del DOM al hacer clic en el botón de eliminación
      let parent = element.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

// Eliminar tarea del almacenamiento local
const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  // Volver a mostrar las tareas actualizadas después de eliminar la tarea
  displayTasks();
};

// Agregar tareas al almacenamiento local
const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  // Volver a mostrar las tareas actualizadas después de actualizar el estado de la tarea
  displayTasks();
};

// Función para agregar nueva tarea
document.querySelector("#push").addEventListener("click", () => {
  if (newTaskInput.value.length == 0) {
    // Alerta si no se ingresa ninguna tarea al intentar agregar una nueva
    alert("Por favor, ingrese una tarea");
  } else {
    // Almacenar la nueva tarea en el almacenamiento local y mostrar las tareas actualizadas
    updateStorage(count, newTaskInput.value, false);
    count += 1;
    newTaskInput.value = ""; // Limpiar el campo de entrada después de agregar la tarea
  }
});