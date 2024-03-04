document.addEventListener('DOMContentLoaded', function() {
    var nombreUsuario = sessionStorage.getItem('usuario');
    var menuAbierto = false;

    // Funcion para mostrar el mensaje de bienvenido con el nombre del usuario
    function mostrarBienvenida(nombreUsuario) {
        var menu = document.getElementById('menu-list');
        var menuHTML = '<li class="welcome-message">Bienvenido, ' + nombreUsuario + '!</li><li><a href="#" id="profile-btn">Perfil</a></li><li><a href="#" id="cerrar-sesion">Cerrar sesión</a></li>';
        menu.innerHTML = menuHTML;

        document.getElementById('cerrar-sesion').addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('usuario');
            window.location.href = 'index.html';
        });

        document.getElementById('profile-btn').addEventListener('click', function() {
            var modal = document.getElementById('profile-modal');
            modal.style.display = "block";
        });
    }

    // Funcion para mostrar el inicio de sesion y registro
    function mostrarInicioSesion() {
        var menu = document.getElementById('menu-list');
        var menuHTML = '<li><a href="/Login/login.html">Iniciar Sesión</a></li><li><a href="/Registre/registre.html">Registrarse</a></li>';
        menu.innerHTML = menuHTML;

        var botonesDificultad = document.querySelectorAll('.button');
        botonesDificultad.forEach(function(boton) {
            boton.addEventListener('click', function(event) {
                event.preventDefault();
                alert("Debes iniciar sesión para poder jugar.");
            });
        });
    }

    // Verificar si hay un usuario almacenado y mostrar la bienvenida o el inicio de sesión
    if (nombreUsuario) {
        mostrarBienvenida(nombreUsuario);
    } else {
        mostrarInicioSesion();
    }

    // Manejar la apertura y cierre del menú
    document.getElementById('menu-btn').addEventListener('click', function() {
        var menu = document.getElementById('menu');
        if (!menuAbierto) {
            menu.style.right = '0';
            menuAbierto = true;
        } else {
            menu.style.right = '-250px';
            menuAbierto = false;
        }
    });

    // Cerrar el modal del perfil
    document.getElementsByClassName('close')[0].addEventListener('click', function() {
        var modal = document.getElementById('profile-modal');
        modal.style.display = "none";
    });

    // Guardar los cambios del perfil
    document.getElementById('save-profile-btn').addEventListener('click', function() {
        var newUsername = document.getElementById('new-username').value;
        var newPassword = document.getElementById('new-password').value;

        if (newUsername && newPassword) {
            var storedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
            var userExists = storedUsers.some(function(user) {
                return user === newUsername;
            });
            if (!userExists) {
                sessionStorage.setItem('usuario', newUsername);
                alert("Cambios guardados correctamente.");
                var modal = document.getElementById('profile-modal');
                modal.style.display = "none";
            } else {
                alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
            }
        } else {
            alert("Por favor, ingresa un nuevo nombre de usuario y una nueva contraseña.");
        }
    });
});