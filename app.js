'use strict';

// El script se ejecutará una vez se haya cargado todo el documento HTML.
document.addEventListener('DOMContentLoaded', function()
{
    // Selectores
    var agregar = document.querySelector('form button');

    // Al pulsar el botón de añadir se captura el texto del formulario y se creará un nuevo div con el contenido de este.
    agregar.addEventListener('click', addTarea);
   
});

// Funciones
// Añadir la tarea.
function addTarea(event)
{
    // Evitamos que la página se refresque al pulsar el botón.
    event.preventDefault();
    
    // Creamos los elementos necesarios para realizar la estructura HTML.
    var newDiv = document.createElement('div');
    newDiv.classList.add('tarea');
    
    // Elemento de lista.
    var li = document.createElement('li');
    li.classList.add('nuevaTarea');
    
    // Botones que se encontrarán dentro de cada uno de los contenedor de tareas. Añadimos un evento click para que realicen la función especificada además de una clase identificativa.
    var finalizada = document.createElement('button');
    finalizada.innerHTML ='<i class="fas fa-check"></i>';
    finalizada.classList.add('completada');
    finalizada.addEventListener('click', completarTarea);
    
    var borrar = document.createElement('button');
    borrar.innerHTML = '<i class="fas fa-trash-alt"></i>';
    borrar.classList.add('eliminar');
    borrar.addEventListener('click', eliminarTarea);
    
    // Obtenemos el selector del contenedor principal donde guardaremos las tareas.
    var contenedor = document.querySelector('.listaTareas');

    // Obtenemos el texto del campo para agregarlo al contenedor.
    var texto = document.getElementById('tarea');
    
    // Añadir todos los elementos al contenedor de tareas.
    li.innerHTML = texto.value;
    newDiv.appendChild(li);
    newDiv.appendChild(finalizada);
    newDiv.appendChild(borrar);
    contenedor.appendChild(newDiv);

    // Eliminamos el texto que se encuentra en el campo Input.
    texto.value = "";
}

// Marcar la tarea como completada.
function completarTarea(event)
{
    // Eliminamos el comportamiento por defecto al pulsar el botón.
    event.preventDefault();

    // Agregamos la clase tareaCompletada al elemento padre.
    this.parentElement.classList.add('tareaCompletada');
}

// Eliminar la tarea de la lista.
function eliminarTarea(event)
{
    // Eliminamos el comportamiento por defecto al pulsar el botón.
    event.preventDefault();

    var elemento = this.parentElement;
    // Agregamos la clase tareaEliminada para que realice la animación indicada mediante CSS.
    this.parentElement.classList.add('tareaEliminada');

    // Una vez finalizada la animación, obtenemos el elemento padre del botón seleccionado (ya que es el que contendrá la tarea en su totalidad), y lo eliminamos del DOM.
    this.parentElement.addEventListener('transitionend', function()
    {
        this.remove();
    });
}

// Comprobamos si el campo Input esta vacio, si lo esta al pulsar el botón no se deberá añadir ninguna tarea y se deberá mostrar un mensaje de error.
function comprobarVacio()
{
    var input = document.querySelector('.tarea');

    if (input.value == "")
    {
        return true;
    }

    else
    {
        return false;
    }
}