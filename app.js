"use strict";

// El script se ejecutará una vez se haya cargado todo el documento HTML.
document.addEventListener("DOMContentLoaded", function () {
  // Selectores
  var agregar = document.querySelector("form button");
  var seleccion = document.querySelector('#lista');

  // Al pulsar el botón de añadir se captura el texto del formulario y se creará un nuevo div con el contenido de este. Primero llamara a la función comprobarVacio. En el caso de que el formulario este vacio no se añadirá un div nuevo.
  agregar.addEventListener("click", addTarea);

  // Al seleccionar cada una de las opciones indicadas se realizará un filtro entre todas las tareas, las tareas finalizadas y las pendientes.
  seleccion.addEventListener('click', filtroTareas);
});

// Funciones

// Añadir la tarea.
function addTarea(event) {
  // Evitamos que la página se refresque al pulsar el botón.
  event.preventDefault();

  // Creamos los elementos necesarios para realizar la estructura HTML.
  var newDiv = document.createElement("div");
  newDiv.classList.add("tarea");

  // Elemento de lista.
  var li = document.createElement("li");
  li.classList.add("nuevaTarea");

  // Botones que se encontrarán dentro de cada uno de los contenedor de tareas. Añadimos un evento click para que realicen la función especificada además de una clase identificativa.
  var finalizada = document.createElement("button");
  finalizada.innerHTML = '<i class="fas fa-check"></i>';
  finalizada.classList.add("completada");
  finalizada.addEventListener("click", completarTarea);

  var borrar = document.createElement("button");
  borrar.innerHTML = '<i class="fas fa-trash-alt"></i>';
  borrar.classList.add("eliminar");
  borrar.addEventListener("click", eliminarTarea);

  // Obtenemos el selector del contenedor principal donde guardaremos las tareas.
  var contenedor = document.querySelector(".listaTareas");

  // Obtenemos el texto del campo para agregarlo al contenedor.
  var texto = document.getElementById("tarea");

  // Añadir todos los elementos al contenedor de tareas.
  li.innerHTML = texto.value;
  newDiv.appendChild(li);
  newDiv.appendChild(finalizada);
  newDiv.appendChild(borrar);
  contenedor.appendChild(newDiv);

  // Guardamos la tarea en el localStorage.
  guardarTarea(texto.value);
  // Eliminamos el texto que se encuentra en el campo Input.
  texto.value = "";
}

// Marcar la tarea como completada.
function completarTarea(event) {
  // Eliminamos el comportamiento por defecto al pulsar el botón.
  event.preventDefault();

  // Agregamos la clase tareaCompletada al elemento padre.
  this.parentElement.classList.add("tareaCompletada");
}

// Eliminar la tarea de la lista.
function eliminarTarea(event) {
  // Eliminamos el comportamiento por defecto al pulsar el botón.
  event.preventDefault();

  // Agregamos la clase tareaEliminada para que realice la animación indicada mediante CSS.
  this.parentElement.classList.add("tareaEliminada");

  // Una vez finalizada la animación, obtenemos el elemento padre del botón seleccionado (ya que es el que contendrá la tarea en su totalidad), y lo eliminamos del DOM.
  this.parentElement.addEventListener("transitionend", function () {
      this.remove();
    });
}

// Guardamos cada tarea en el localStorage lo que nos permitirá guardar las tareas a pesar de cerrar las pestañas del navegador o recargar la página.
function guardarTarea(tarea){
    var todasLasTareas;

    // Comprobamos si hay tareas guardadas. Si no las hay, crearemos el array que las contendrá, en caso contrario se añadirán las nuevas tareas.
    if (localStorage.getItem('listaDeTareas') == null){
        todasLasTareas = [];
    }else{
        todasLasTareas = JSON.parse(localStorage.getItem('listaDeTareas'));
    }
    
    todasLasTareas.push(tarea);
    localStorage.setItem('listaDeTareas', JSON.stringify(todasLasTareas));
}

// Filtro que nos permitirá seleccionar si queremos ver todas las tareas creadas, las finalizadas o las incompletas.
function filtroTareas(){
    // Seleccionamos todas las tareas y, por cada una de ellas, dependiendo de la selección del filtro, mostraremos o ocultaremos las tareas según la selección.
    var tareas = document.querySelectorAll('.tarea');

    tareas.forEach(tarea => {
        switch(this.value){
            case 'todas':
                tarea.style.display = 'flex';
                break;
            case 'finalizadas':
                if (tarea.classList.contains('tareaCompletada')){
                    tarea.style.display = 'flex';
                } else{
                    tarea.style.display = 'none';
                }
                break;
            case 'pendientes': 
                if (!tarea.classList.contains('tareaCompletada')){
                    tarea.style.display = 'flex';
                } else{
                    tarea.style.display = 'none';
                }
                break;
        }
    });
}


// Comprobamos si el campo Input esta vacio, si lo esta al pulsar el botón no se deberá añadir ninguna tarea y se deberá mostrar un mensaje de error.
function comprobarVacio() {
  var input = document.querySelector(".tarea");

  if (input.value == "") {
    return true;
  } else {
    return false;
  }
}
