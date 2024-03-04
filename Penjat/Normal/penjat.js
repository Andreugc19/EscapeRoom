// Capturar elementos del DOM
const teclado = document.getElementById("teclado");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const contador = document.getElementById("contador");
const errores = document.getElementById("errores");
const palabra = document.getElementById("palabra");
const boton = document.getElementById("boton");
const texto = document.getElementById("texto");
const cuentaAtras = document.getElementById("cuentaAtras");

// Variables para el Juego
let palabraAAdvinar = "";
let caracteresAdivinados = Array(palabraAAdvinar.length);
let erroresActuales = 0;
let intentosRestantes = 7;
let adivinado = false;
let penalizacionPorTiempo = 0;
let intervalo;
let intervaloCuentaAtras;
let tiempoCuentaAtras = 10;
let tiempo = new Date();
let jsonArray;

tiempo.setHours(0, 0, 0, 0);

// Función para iniciar una nueva partida
function iniciarPartida() {
  const categorias = ['animales', 'países', 'ciudades', 'profesiones', 'deportes'];
  const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
  palabraAleatoria(categoriaAleatoria);
  penalizacionPorTiempo = 0;
  reiniciar();
  empezar();
  let teclas = document.querySelectorAll(".letra");
  teclas.forEach(function (tecla) {
    tecla.classList.remove("incorrecta");
    tecla.classList.remove("correcta");
  });
  texto.innerText = "";
  palabra.innerText = "";
  teclado.classList.remove("deshabilitado");
  erroresActuales = 0;
  intentosRestantes = 7;
  contador.innerHTML = intentosRestantes;
  errores.innerHTML = erroresActuales;
  reiniciarCuentaAtras();
}

// Función para el cronómetro
function cronometro() {
  let horasActuales = tiempo.getHours();
  let minutosActuales = tiempo.getMinutes();
  let segundosActuales = tiempo.getSeconds();

  segundosActuales += 1;

  if (segundosActuales == 60) {
    segundosActuales = 0;
    minutosActuales += 1;
  }

  if (minutosActuales == 60) {
    minutosActuales = 0;
    horasActuales += 1;
  }

  tiempo.setSeconds(segundosActuales);
  tiempo.setMinutes(minutosActuales);
  tiempo.setHours(horasActuales);

  // Formatear y mostrar el tiempo en el HTML
  if (horasActuales < 10) {
    horasActuales = "0" + horasActuales;
  }
  if (minutosActuales < 10) {
    minutosActuales = "0" + minutosActuales;
  }
  if (segundosActuales < 10) {
    segundosActuales = "0" + segundosActuales;
  }

  horas.innerHTML = horasActuales;
  minutos.innerHTML = minutosActuales;
  segundos.innerHTML = segundosActuales;
}

// Función para formatear el tiempo en milisegundos
function formatTiempo(tiempoEnMilisegundos) {
  const segundosTotales = Math.floor(tiempoEnMilisegundos / 1000);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  const formatoMinutos = minutos < 10 ? '0' + minutos : minutos;
  const formatoSegundos = segundos < 10 ? '0' + segundos : segundos;

  return `${formatoMinutos}:${formatoSegundos}`;
}

// Función para iniciar el contador regresivo
function iniciarCuentaAtras() {
  intervaloCuentaAtras = setInterval(() => {
    tiempoCuentaAtras--;
    cuentaAtras.innerText = tiempoCuentaAtras;

    if (tiempoCuentaAtras === 0) {
      intentosRestantes--;
      contador.innerHTML = intentosRestantes;
      reiniciarCuentaAtras();
    }
  }, 1000);
}

// Función para reiniciar el contador regresivo
function reiniciarCuentaAtras() {
  clearInterval(intervaloCuentaAtras);
  tiempoCuentaAtras = 10;
  cuentaAtras.innerText = tiempoCuentaAtras;
  iniciarCuentaAtras();
}

// Función para detener el contador regresivo
function detenerCuentaAtras() {
  clearInterval(intervaloCuentaAtras);
}

// Función para avanzar en el turno del juego al seleccionar una letra
function avanzarTurno(elemento) {
  detenerCuentaAtras();

  penalizacionPorTiempo = 0;
  adivinado = true;
  let caracter = elemento.innerText;
  palabra.innerText = "";
  let caracteresAdivinadosAnteriores = [...caracteresAdivinados];

  for (let index = 0; index < palabraAAdvinar.length; index++) {
    let caracterActual = palabraAAdvinar[index];
    if (caracterActual == caracter) {
      caracteresAdivinados[index] = true;
      elemento.classList.add("correcta");
    }
    if (caracteresAdivinados[index] == true) {
      palabra.innerText += " " + caracterActual + " ";
    } else {
      adivinado = false;
      palabra.innerText += " _ ";
    }
  }

  if (
    JSON.stringify(caracteresAdivinados) ==
    JSON.stringify(caracteresAdivinadosAnteriores)
  ) {
    elemento.classList.add("incorrecta");
    intentosRestantes--;
    erroresActuales++;
    contador.innerHTML = intentosRestantes;
    errores.innerHTML = erroresActuales;
  }

  reiniciarCuentaAtras();
  acabarPartida();
}

// Función para terminar la partida y mostrar el resultado
function acabarPartida() {
  const popup = document.getElementById("popup");
  const popupTitulo = document.getElementById("popup-titulo");
  const popupMensaje = document.getElementById("popup-mensaje");

  if (adivinado || intentosRestantes === 0) {
    detener();
    detenerCuentaAtras();
    teclado.classList.add("deshabilitado");
    boton.disabled = false;

    if (adivinado) {
      const estadisticas = {
        palabra: palabraAAdvinar,
        errores: erroresActuales,
        tiempo: formatTiempo(tiempo.getTime()),
      };
      const historialEstadisticas = JSON.parse(localStorage.getItem('historialEstadisticas')) || [];
      historialEstadisticas.push(estadisticas);
      localStorage.setItem('historialEstadisticas', JSON.stringify(historialEstadisticas));

      popupTitulo.innerHTML = "¡Felicitaciones, has ganado!";
      popupMensaje.innerHTML = "¡Has adivinado la palabra correctamente!<br><br>ESTADÍSTICAS<br>Palabra: " + estadisticas.palabra + "<br>Errores: " + estadisticas.errores + "<br>Tiempo: " + estadisticas.tiempo;

      botonCerrar.style.display = "none";

      setTimeout(() => {
        window.location.href = "../../Historia/Normal/prova3.html";
      }, 2000);
    } else {
      popupTitulo.innerHTML = "Has perdido";
      popupMensaje.innerHTML = "La palabra a adivinar era: " + palabraAAdvinar;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    popup.style.display = "flex";
  }
}

// Función para comenzar el juego
function empezar() {
  intervalo = setInterval(cronometro, 1000);
}

// Función para reiniciar el cronómetro
function reiniciar() {
  tiempo.setHours(0, 0, 0, 0);
  horas.innerHTML = "00";
  minutos.innerHTML = "00";
  segundos.innerHTML = "00";
}

// Función para detener el cronómetro
function detener() {
  clearInterval(intervalo);
}

// Función para seleccionar una palabra aleatoria de una categoría
function palabraAleatoria(categoria) {
  obtenerJSON((error, datos) => {
    gestionarRespuesta(error, datos);
    palabraAAdvinar = jsonArray[Math.floor(Math.random() * jsonArray.length)];
    caracteresAdivinados = Array(palabraAAdvinar.length);

    console.log(palabraAAdvinar);

    for (let index = 0; index < palabraAAdvinar.length; index++) {
      caracteresAdivinados[index] = false;
      palabra.innerText += " _ ";
    }
  }, "JSON/" + categoria + ".json");
}

// Función para obtener datos JSON mediante una solicitud XMLHttpRequest
const obtenerJSON = (callback, fuente) => {
  const peticion = new XMLHttpRequest();

  peticion.addEventListener("readystatechange", () => {
    if (peticion.readyState == 4 && peticion.status == 200) {
      const respuesta = JSON.parse(peticion.responseText);
      callback(undefined, respuesta);
    } else if (peticion.readyState === 4) {
      callback("No se han podido obtener los datos", undefined);
    }
  });

  peticion.open("GET", fuente);
  peticion.send();
};

// Función para gestionar la respuesta JSON
function gestionarRespuesta(error, datos) {
  if (error) {
    console.log(error);
  } else {
    jsonArray = datos;
  }
}

// Añadir evento al botón de cerrar del popup
const botonCerrar = document.getElementById("boton-cerrar");
botonCerrar.addEventListener("click", () => {
  popup.style.display = "none";
  window.location.reload();
});

// Añadir evento al botón de iniciar
boton.addEventListener("click", (e) => {
  boton.disabled = true;
  iniciarPartida();
});

// Añadir evento al teclado
teclado.addEventListener("click", (e) => {
  let elemento = e.target;
  if (elemento.classList.contains("letra")) {
    avanzarTurno(elemento);
  }
});

function darPista() {
  let letrasNoAdivinadas = [];
  // Iterar sobre la palabra a adivinar y seleccionar las letras no adivinadas aún
  for (let i = 0; i < palabraAAdvinar.length; i++) {
    if (!caracteresAdivinados[i]) {
      letrasNoAdivinadas.push(palabraAAdvinar[i]);
    }
  }
  // Si hay letras no adivinadas, elige una aleatoria y avanza el turno con esa letra
  if (letrasNoAdivinadas.length > 0) {
    let indiceAleatorio = Math.floor(Math.random() * letrasNoAdivinadas.length);
    let letraAleatoria = letrasNoAdivinadas[indiceAleatorio];
    let teclasCoincidentes = document.querySelectorAll(".letra:not(.correcta):not(.incorrecta)");
    for (let tecla of teclasCoincidentes) {
      if (tecla.textContent === letraAleatoria) {
        if (!tecla.classList.contains("pista-revelada")) {
          tecla.classList.add("pista-revelada");
          avanzarTurno(tecla);
          intentosRestantes--;
          contador.innerHTML = intentosRestantes;
        }
        setTimeout(() => {
          tecla.classList.remove("pista-revelada");
        }, 2000);
        break;
      }
    }
  }
}

// Event listener para el botón "Generar Pista"
document.getElementById("boton-pista").addEventListener("click", darPista);

// Función para actualizar el temporizador
function actualizarTemporizador() {
  let elementoTemporizador = document.getElementById("temporizador");
  
  let tiempoInicial = localStorage.getItem('tiempoInicial');
  
  if (tiempoInicial !== null) {
      let tiempoTranscurrido = Math.floor((new Date() - new Date(tiempoInicial)) / 1000);

      let minutos = Math.floor(tiempoTranscurrido / 60);
      let segundos = tiempoTranscurrido % 60;

      segundos = segundos < 10 ? "0" + segundos : segundos;

      elementoTemporizador.textContent = "Tiempo transcurrido: " + minutos + ":" + segundos + " segundos";
  }
}

// Actualizar el temporizador cada segundo
setInterval(actualizarTemporizador, 1000);