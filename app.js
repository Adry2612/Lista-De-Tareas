'use strict';

document.addEventListener('DOMContentLoaded', function()
{
    
    // Al pulsar el botón de añadir se captura el texto del formulario y se creará un nuevo div con el contenido de este.
    var boton = document.querySelector('form button');
    document.preventDefault(boton);
    boton.addEventListener('click', addTarea);
    
    function addTarea(event)
    {
        
        
        var contenedor = document.querySelector('.listaTareas');
        var texto = document.querySelector('#tarea').value;
        
        var newDiv = document.createElement('div');
        newDiv.appendChild(texto);
        contenedor.appendChild(newDiv);

        alert('hoal');

    }
});
