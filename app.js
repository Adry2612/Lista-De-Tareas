'use strict';

// El script se ejecutará una vez se haya cargado todo el documento HTML.
document.addEventListener('DOMContentLoaded', function()
{
    // Selectores
    const boton = document.querySelector('form button');
    const contenedor = document.querySelector('.listaTareas');

    // Al pulsar el botón de añadir se captura el texto del formulario y se creará un nuevo div con el contenido de este.
    boton.addEventListener('click', addTarea);
    
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

        // Botones que se encontrarán dentro de cada uno de los contenedor de tareas.
        var finalizada = document.createElement('button');
        finalizada.innerHTML ='<i class="fas fa-check"></i>';
        finalizada.classList.add('completada');
        
        var borrar = document.createElement('button');
        borrar.innerHTML = '<i class="fas fa-trash-alt"></i>';
        borrar.classList.add('eliminar');

        // Obtenemos el texto del campo para agregarlo al contenedor.
        var texto = document.getElementById('tarea').value;
        console.log(texto);
        // Añadir todos los elementos al contenedor de tareas.
        li.innerHTML = texto;
        newDiv.appendChild(li);
        newDiv.appendChild(finalizada);
        newDiv.appendChild(borrar);
        contenedor.appendChild(newDiv);
        
        
    }
});
