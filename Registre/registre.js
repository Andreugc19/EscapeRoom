document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var nombreUsuario = document.getElementById('nombre').value;
    var contrasena = document.getElementById('contrasena').value;
    
    // Verificar si el nombre de usuario ya existe en el almacenamiento local
    if (localStorage.getItem(nombreUsuario)) {
        document.getElementById('mensaje').textContent = 'El nombre de usuario ya está en uso.';
    } else {
        // Almacenar el nuevo usuario en el almacenamiento local
        localStorage.setItem(nombreUsuario, contrasena);
        document.getElementById('mensaje').textContent = 'Usuario registrado con éxito.';
    }
});