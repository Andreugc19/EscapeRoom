document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var nombreUsuario = document.getElementById('nombre').value;
    var contrasena = document.getElementById('contrasena').value;
    
    var userData = JSON.parse(localStorage.getItem(nombreUsuario));
    
    // Comprobar si la contraseña y usuario coinciden
    if (userData && userData.password === contrasena) {
        sessionStorage.setItem('usuario', nombreUsuario);
        window.location.href = '../index.html';
    } else {
        document.getElementById('mensaje').textContent = 'Nombre de usuario o contraseña incorrectos.';
    }
});