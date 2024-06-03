document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addUserForm');
    const inputs = form.querySelectorAll('input');

    // Agregar event listeners para input y blur a todos los campos
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            validateFieldInput(input);
        });
        input.addEventListener('blur', function () {
            validateFieldInput(input);
        });
    });

    // Agregar event listener para submit del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            addUser();
        }
    });

    // Agregar event listener para formatear RUT
    const rutInput = document.getElementById('rut');
    rutInput.addEventListener('input', function () {
        formatRUT(rutInput);
        checkRut(rutInput)
        validateFieldInput(rutInput);
    });
    rutInput.addEventListener('blur', function () {
        validateFieldInput(rutInput);
    });
});

// Función para validar campos
function validateFieldInput(input) {
    if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

function validateFieldInput(inputField) {
    const inputValue = inputField.value;
    const isValid = validateField(inputField);
    const errorMessage = inputField.parentElement.querySelector('.invalid-feedback');
    const validIcon = inputField.parentElement.querySelector('.valid-feedback');
    const invalidIcon = inputField.parentElement.querySelector('.invalid-feedback-icon');

    if (!isValid) {
        inputField.classList.add('is-invalid');
        inputField.classList.remove('is-valid');
        invalidIcon.style.display = 'block';
        validIcon.style.display = 'none';
        errorMessage.style.display = 'block';
    } else {
        inputField.classList.remove('is-invalid');
        inputField.classList.add('is-valid');
        invalidIcon.style.display = 'none';
        validIcon.style.display = 'block';
        errorMessage.style.display = 'none';
    }
}

function validateField(inputField) {
    const inputValue = inputField.value;
    const fieldName = inputField.id;

    switch (fieldName) {
        case 'rut':
            return formatRUT(inputValue);
        case 'nombre':
            return validateName(inputValue);
        case 'apellido': // Puedes agregar más campos aquí si es necesario
            return validateName(inputValue);
        case 'email':
            return validateEmail(inputValue);
        case 'telefono':
            return validatePhone(inputValue);
        default:
            return true; // Si no se encuentra el campo, devolver válido
    }
}

// Función para formatear el RUT
function formatRUT(input) {
    let value = input.value.replace(/\./g, '').replace('-', '').toUpperCase();

    // Solo permitir números y K
    value = value.replace(/[^0-9K]/g, '');

    // Limitar longitud del RUT
    if (value.length > 9) {
        value = value.slice(0, 9);
    }

    if (value.length > 0) {
        let body = value.slice(0, -1);
        let dv = value.slice(-1);
        input.value = body.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + (body.length >= 6 ? '-' : '') + dv;
    } else {
        input.value = value;
    }
}

// Función para formatear el RUT
function formatRUT(input) {
    // Despejar Puntos
    var valor = rut.value.replace(/\./g, '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    var cuerpo = valor.slice(0, -1);
    var dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + dv;

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
        rut.setCustomValidity("RUT Incompleto");
        return false;
    }

    // Calcular Dígito Verificador
    var suma = 0;
    var multiplo = 2;

    // Para cada dígito del Cuerpo
    for (var i = 1; i <= cuerpo.length; i++) {
        // Obtener su Producto con el Múltiplo Correspondiente
        var index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    var dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
        rut.setCustomValidity("RUT Inválido");
        return false;
    }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
    return true;
}

function validateRUT(rut) {
    const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]{1}$/;
    return rutPattern.test(rut);
}

function validateName(name) {
    const namePattern = /^[A-Za-z\u00C0-\u00FF]+$/;
    const containsSpace = /\s/.test(name); // Verifica si hay espacios en el nombre
    const maxLength = name.length <= 30; // Verifica si el nombre tiene menos de 30 caracteres
    return namePattern.test(name.trim()) && !containsSpace && maxLength;
}

function validateEmail(email) {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^\d{9}$/;
    return phonePattern.test(phone);
}

function validateForm() {
    const rut = document.getElementById('rut').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    let isValid = true;

    if (!validateRUT(rut)) {
        document.getElementById('rut').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('rut').classList.remove('is-invalid');
    }

    if (!validateName(nombre)) {
        document.getElementById('nombre').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('nombre').classList.remove('is-invalid');
    }

    if (!validateName(apellido)) {
        document.getElementById('apellido').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('apellido').classList.remove('is-invalid');
    }

    if (!validateEmail(email)) {
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('email').classList.remove('is-invalid');
    }

    if (!validatePhone(telefono)) {
        document.getElementById('telefono').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('telefono').classList.remove('is-invalid');
    }

    return isValid;
}

// Añadir usuario a la tabla
function addUserToTable(rut, nombre, email, telefono) {
    const tableBody = document.querySelector('.products-area-wrapper.tableView');

    const newRow = document.createElement('div');
    newRow.classList.add('products-row');

    const rutCell = document.createElement('div');
    rutCell.classList.add('product-cell', 'rut');
    rutCell.innerHTML = `<span>${rut}</span>`;
    newRow.appendChild(rutCell);

    const nombreCell = document.createElement('div');
    nombreCell.classList.add('product-cell', 'nombre');
    nombreCell.innerHTML = `<span>${nombre}</span>`;
    newRow.appendChild(nombreCell);

    const emailCell = document.createElement('div');
    emailCell.classList.add('product-cell', 'email');
    emailCell.innerHTML = `<span>${email}</span>`;
    newRow.appendChild(emailCell);

    const telefonoCell = document.createElement('div');
    telefonoCell.classList.add('product-cell', 'telefono');
    telefonoCell.innerHTML = `<span>${telefono}</span>`;
    newRow.appendChild(telefonoCell);

    const buttonsCell = document.createElement('div');
    buttonsCell.classList.add('product-cell', 'acciones');
    buttonsCell.innerHTML = `<button class="btn btn-danger me-2 adminbtn">Eliminar</button>
                             <button class="btn btn-success adminbtn">Modificar</button>`;
    newRow.appendChild(buttonsCell);

    tableBody.appendChild(newRow);
}

function addUser() {
    const form = document.getElementById('addUserForm');

    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return;
    }

    const rut = document.getElementById('rut').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    addUserToTable(rut, nombre + ' ' + apellido, email, telefono);

    const addUserModal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    addUserModal.hide();

    form.reset();
    form.classList.remove('was-validated');
    form.querySelectorAll('.is-valid').forEach(input => input.classList.remove('is-valid'));
    form.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
}
//**************************FUNCION DE MODIFICAR******************************************** */

// Función para abrir el modal de modificación con los datos preescritos
function openModifyModal(row) {
    // Obtener los datos de la fila
    const rut = row.querySelector('.rut span').textContent;
    const nombreCompleto = row.querySelector('.nombre span').textContent;
    const email = row.querySelector('.email span').textContent;
    const telefono = row.querySelector('.telefono span').textContent;

    // Dividir el nombre en nombre y apellido
    const [nombre, apellido] = nombreCompleto.split(' ');

    // Colocar los datos en los campos del modal
    document.getElementById('modifyRut').value = rut;
    document.getElementById('modifyNombre').value = nombre;
    document.getElementById('modifyApellido').value = apellido;
    document.getElementById('modifyEmail').value = email;
    document.getElementById('modifyTelefono').value = telefono;

    // Mostrar el modal
    const modifyUserModal = new bootstrap.Modal(document.getElementById('modifyUserModal'));
    modifyUserModal.show();
}

// Event listener para el botón de modificar
const modifyButtons = document.querySelectorAll('.btn-success.adminbtn');
modifyButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Obtener la fila correspondiente al usuario
        const row = this.closest('.products-row');
        // Llamar a la función para abrir el modal con los datos preescritos
        openModifyModal(row);
    });
});

