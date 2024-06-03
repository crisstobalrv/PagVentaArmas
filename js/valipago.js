
        // Obtener el formulario
        var form = document.querySelector('form');
      
        // Agregar un evento de escucha para cuando se envíe el formulario
        form.addEventListener('submit', function(event) {
          // Evitar que se envíe el formulario de forma predeterminada
          event.preventDefault();
      
          // Mostrar el modal de compra exitosa
          var modal = new bootstrap.Modal(document.getElementById('modalCompraExitosa'));
          modal.show();
      
          // Redirigir al index después de 3 segundos
          setTimeout(function() {
            window.location.href = 'index.html';
          }, 3000);
        });

        function validarNombre(input) {
            // Obtener el valor del input
            var nombre = input.value;
        
            // Verificar si el nombre contiene al menos un espacio
            var espacios = nombre.split(' ').length - 1;
            if (espacios < 1 || espacios > 2) {
                // Si no hay espacios o hay más de dos espacios (más de un apellido), establecer un error personalizado
                input.setCustomValidity('Debe ingresar un nombre y uno o dos apellidos');
            } else {
                // Si hay al menos un espacio (nombre y al menos un apellido), borrar el error personalizado
                input.setCustomValidity('');
            }
        
            // Aplicar la expresión regular para permitir solo letras y espacios
            input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, '');
        }
        function formatoYValidacionRut(input) {
            // Obtener el valor del input sin espacios ni caracteres especiales
            var rut = input.value.replace(/[^\dKk]/g, '');
        
            // Agregar puntos y guión de acuerdo al formato rut (xx.xxx.xxx-x)
            rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
        
            // Actualizar el valor del input con el formato
            input.value = rut;
        
            // Validar el rut
            if (!validarRut(rut)) {
                input.setCustomValidity('El rut ingresado no es válido');
            } else {
                input.setCustomValidity('');
            }
        }
        
        function validarRut(rut) {
    // Expresión regular para validar el Rut chileno
    var rutRegex = /^(\d{1,2}\.)?(\d{3}\.)?\d{3}-[\dkK]$/;

    // Validar el Rut utilizando la expresión regular
    if (rutRegex.test(rut)) {
        return true; // El Rut es válido
    } else {
        return false; // El Rut no es válido
    }
}



    function validarCalle(input) {
        // Aplicar la expresión regular para permitir solo letras y espacios
        input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    
    function validarNumeroCasa(input) {
        // Aplicar la expresión regular para permitir solo números
        input.value = input.value.replace(/[^0-9]/g, '');
    }



    function validarCiudad(input) {
        // Aplicar la expresión regular para permitir solo letras y espacios
        input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    
    function validarRegion(input) {
        // Aplicar la expresión regular para permitir solo letras y espacios
        input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    
    function validarCodigoPostal(input) {
        // Aplicar la expresión regular para permitir solo números
        input.value = input.value.replace(/[^0-9]/g, '');
    }

    function validarNumeroTarjeta(input) {
        // Aplicar la expresión regular para permitir solo números
        input.value = input.value.replace(/[^0-9]/g, '');
    }
    
    
    function validarCCV(input) {
        // Aplicar la expresión regular para permitir solo números
        input.value = input.value.replace(/[^0-9]/g, '');
    }

    function formatearYValidarFechaExpiracion(input) {
        // Obtener el valor del input sin espacios ni caracteres especiales
        var fecha = input.value.replace(/[^\d/]/g, '');
    
        // Eliminar el último '/' si se ingresó accidentalmente
        if (fecha.length > 3) {
            fecha = fecha.slice(0, 2) + '/' + fecha.slice(2);
        }
    
        // Actualizar el valor del input con el formato MM/YY
        input.value = fecha;
    
        // Validar el formato de la fecha
        if (!validarFormatoFecha(fecha)) {
            input.setCustomValidity('Por favor, ingrese una fecha válida en formato MM/YY');
        } else {
            input.setCustomValidity('');
        }
    }
    
    function validarFormatoFecha(fecha) {
        // Expresión regular para validar el formato MM/YY
        var regexFecha = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    
        // Validar el formato utilizando la expresión regular
        return regexFecha.test(fecha);
    }