document.addEventListener('DOMContentLoaded', function() {
    var nombreUsuario = sessionStorage.getItem('usuario');
    if (nombreUsuario) {
        var menu = document.getElementById('menu-list');
        var menuHTML = '<li class="welcome-message">Bienvenido, ' + nombreUsuario + '!</li><li><a href="#" id="cerrar-sesion">Cerrar sesión</a></li>';
        menu.innerHTML = menuHTML;

        document.getElementById('cerrar-sesion').addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('usuario');
            window.location.href = 'index.html';
        });
    }
});

document.getElementById('menu-btn').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    if (menu.style.right === '-250px') {
        menu.style.right = '0';
    } else {
        menu.style.right = '-250px';
    }
});