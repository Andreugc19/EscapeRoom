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

        // Obtener los botones de dificultad
        var botonesDificultad = document.querySelectorAll('.button');
        // Iterar sobre los botones para agregar el evento de clic modificado
        botonesDificultad.forEach(function(boton) {
            boton.addEventListener('click', function(event) {
                // Verificar si hay un usuario conectado
                if (!nombreUsuario) {
                    event.preventDefault();
                    alert("Debes iniciar sesión para poder jugar.");
                }
            });
        });
    } else {
        // Si no hay un usuario conectado, deshabilitar los botones de dificultad
        var botonesDificultad = document.querySelectorAll('.button');
        botonesDificultad.forEach(function(boton) {
            boton.addEventListener('click', function(event) {
                event.preventDefault();
                alert("Debes iniciar sesión para poder jugar.");
            });
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