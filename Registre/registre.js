document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var nombreUsuario = document.getElementById('nombre').value;
    var contrasena = document.getElementById('contrasena').value;

    // Validar el nombre de usuario
    var nombreValido = validarNombreUsuario(nombreUsuario);

    // Validar la contraseña
    var contrasenaValida = validarContrasena(contrasena);

    if (!nombreValido || !contrasenaValida) {
        return; // Detener el proceso si los campos no son válidos
    }

    // Verificar si el nombre de usuario ya existe en el almacenamiento local
    if (localStorage.getItem(nombreUsuario)) {
        document.getElementById('mensaje').textContent = 'El nombre de usuario ya está en uso.';
    } else {
        // Almacenar el nuevo usuario en el almacenamiento local
        var userData = { username: nombreUsuario, password: contrasena };
        localStorage.setItem(nombreUsuario, JSON.stringify(userData));
        document.getElementById('mensaje').textContent = 'Usuario registrado con éxito.';
    }
});

function validarNombreUsuario(nombreUsuario) {
    var nombreError = document.getElementById('nombre-error');
    var regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(nombreUsuario)) {
        nombreError.textContent = 'El nombre de usuario debe tener al menos 6 caracteres y contener al menos 1 mayúscula y 1 minúscula.';
        return false;
    } else {
        nombreError.textContent = '';
    }
    return true;
}

function validarContrasena(contrasena) {
    var contrasenaError = document.getElementById('contrasena-error');
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!regex.test(contrasena)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.';
        return false;
    } else {
        contrasenaError.textContent = '';
    }
    return true;
}