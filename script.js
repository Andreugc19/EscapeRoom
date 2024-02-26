document.addEventListener('DOMContentLoaded', function() {
    var nombreUsuario = sessionStorage.getItem('usuario');
    var menuAbierto = false;

    // Función para mostrar el mensaje de bienvenida y los botones correspondientes
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

    // Función para mostrar el mensaje de inicio de sesión
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

    // Verificar si hay un usuario conectado
    if (nombreUsuario) {
        mostrarBienvenida(nombreUsuario);
    } else {
        mostrarInicioSesion();
    }

    // Agregar evento al botón del menú
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

    // Agregar evento al botón de cerrar de la ventana modal
    document.getElementsByClassName('close')[0].addEventListener('click', function() {
        var modal = document.getElementById('profile-modal');
        modal.style.display = "none";
    });

    // Agregar evento al botón de guardar cambios
    document.getElementById('save-profile-btn').addEventListener('click', function() {
        var newUsername = document.getElementById('new-username').value;
        var newPassword = document.getElementById('new-password').value;

        // Lógica para validar y guardar los cambios
        if (newUsername && newPassword) {
            var storedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
            var userExists = storedUsers.some(function(user) {
                return user === newUsername;
            });
            if (!userExists) {
                // El nuevo nombre de usuario no coincide con uno existente, guardar los cambios
                sessionStorage.setItem('usuario', newUsername);
                // Podrías guardar la contraseña también si lo deseas
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

