document.addEventListener('DOMContentLoaded', function() {
    // Obtener los datos de clasificación del almacenamiento local
    let clasificacion = JSON.parse(localStorage.getItem('clasificacion')) || [];

    // Ordenar la clasificación por tiempo de forma ascendente
    clasificacion.sort((a, b) => a.tiempo - b.tiempo);

    // Obtener el tbody de la tabla
    const tbody = document.getElementById('tabla-clasificacion');

    // Función para crear una fila de la tabla
    function crearFila(usuario, tiempo) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario}</td>
            <td>${formatoTiempo(tiempo)}</td>
        `;
        return fila;
    }

    // Función para formatear el tiempo en minutos y segundos
    function formatoTiempo(tiempo) {
        const minutos = Math.floor(tiempo / 60);
        const segundos = tiempo % 60;
        return `${minutos}:${segundos < 10 ? '0' + segundos : segundos} segundos`;
    }

    // Insertar cada entrada de la clasificación en la tabla
    clasificacion.forEach(({ usuario, tiempo }) => {
        const fila = crearFila(usuario, tiempo);
        tbody.appendChild(fila);
    });
});