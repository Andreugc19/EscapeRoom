// Capturar elementos del DOM
const teclat = document.getElementById("teclat");
const hores = document.getElementById("hores");
const minuts = document.getElementById("minuts");
const segons = document.getElementById("segons");
const contador = document.getElementById("contador");
const errors = document.getElementById("errors");
const paraula = document.getElementById("paraula");
const boto = document.getElementById("boto");
const text = document.getElementById("text");
const compteEnrrere = document.getElementById("compteEnrrere");

// Variables para el Juego
let paraulaAEndevinar = "";
let caractersEndivitats = Array(paraulaAEndevinar.length);
let varErrors = 0;
let varIntents = 7;
let endivinat = false;
let penalizacioPerTemps = 0;
let interval;
let intervalCompteEnrrere;
let tempsCompteEnrrere = 10;
let temps = new Date();
let jsonArray;

temps.setHours(0, 0, 0, 0);

// Función para iniciar una nueva partida
function iniciarPartida() {
  const categories = ['animals', 'paisos', 'ciutats', 'professions', 'deports'];
  const categoriaAleatoria = categories[Math.floor(Math.random() * categories.length)];
  paraulaAleatoria(categoriaAleatoria);
  penalizacioPerTemps = 0;
  reiniciar();
  començar();
  let tecles = document.querySelectorAll(".lletra");
  tecles.forEach(function (tecla) {
    tecla.classList.remove("incorrecta");
    tecla.classList.remove("correcta");
  });
  text.innerText = "";
  paraula.innerText = "";
  teclat.classList.remove("desabilitat");
  varErrors = 0;
  varIntents = 7;
  contador.innerHTML = varIntents;
  errors.innerHTML = varErrors;
  reiniciarCompteEnrrere();
}

// Función para el cronómetro
function crono() {
  let varHores = temps.getHours();
  let varMinuts = temps.getMinutes();
  let varSegons = temps.getSeconds();

  varSegons += 1;

  if (varSegons == 60) {
    varSegons = 0;
    varMinuts += 1;
  }

  if (varMinuts == 60) {
    varMinuts = 0;
    varHores += 1;
  }

  temps.setSeconds(varSegons);
  temps.setMinutes(varMinuts);
  temps.setHours(varHores);

  // Formatear y mostrar el tiempo en el HTML
  if (varHores < 10) {
    varHores = "0" + varHores;
  }
  if (varMinuts < 10) {
    varMinuts = "0" + varMinuts;
  }
  if (varSegons < 10) {
    varSegons = "0" + varSegons;
  }

  hores.innerHTML = varHores;
  minuts.innerHTML = varMinuts;
  segons.innerHTML = varSegons;
}

// Función para formatear el tiempo en milisegundos
function formatTemps(tempsEnMilisegons) {
  const segonsTotals = Math.floor(tempsEnMilisegons / 1000);
  const minuts = Math.floor((segonsTotals % 3600) / 60);
  const segons = segonsTotals % 60;

  const formatMinuts = minuts < 10 ? '0' + minuts : minuts;
  const formatSegons = segons < 10 ? '0' + segons : segons;

  return `${formatMinuts}:${formatSegons}`;
}

// Función para iniciar el contador regresivo
function iniciarCompteEnrrere() {
  intervalCompteEnrrere = setInterval(() => {
    tempsCompteEnrrere--;
    compteEnrrere.innerText = tempsCompteEnrrere;

    if (tempsCompteEnrrere === 0) {
      varIntents--;
      contador.innerHTML = varIntents;
      reiniciarCompteEnrrere();
    }
  }, 1000);
}

// Función para reiniciar el contador regresivo
function reiniciarCompteEnrrere() {
  clearInterval(intervalCompteEnrrere);
  tempsCompteEnrrere = 10;
  compteEnrrere.innerText = tempsCompteEnrrere;
  iniciarCompteEnrrere();
}

// Función para detener el contador regresivo
function aturarCompteEnrrere() {
  clearInterval(intervalCompteEnrrere);
}

// Función para avanzar en el turno del juego al seleccionar una letra
function avançarTorn(element) {
  aturarCompteEnrrere();

  penalizacioPerTemps = 0;
  endivinat = true;
  let caracter = element.innerText;
  paraula.innerText = "";
  let caractersEndivitatsAntic = [...caractersEndivitats];

  for (let index = 0; index < paraulaAEndevinar.length; index++) {
    let caracterActual = paraulaAEndevinar[index];
    if (caracterActual == caracter) {
      caractersEndivitats[index] = true;
      element.classList.add("correcta");
    }
    if (caractersEndivitats[index] == true) {
      paraula.innerText += " " + caracterActual + " ";
    } else {
      endivinat = false;
      paraula.innerText += " _ ";
    }
  }

  if (
    JSON.stringify(caractersEndivitats) ==
    JSON.stringify(caractersEndivitatsAntic)
  ) {
    element.classList.add("incorrecta");
    varIntents--;
    varErrors++;
    contador.innerHTML = varIntents;
    errors.innerHTML = varErrors;
  }

  reiniciarCompteEnrrere();
  acabarPartida();
}

// Función para terminar la partida y mostrar el resultado
function acabarPartida() {
  const popup = document.getElementById("popup");
  const popupTitol = document.getElementById("popup-titol");
  const popupMissatge = document.getElementById("popup-missatge");

  if (endivinat || varIntents === 0) {
    aturar();
    aturarCompteEnrrere();
    teclat.classList.add("desabilitat");
    boto.disabled = false;

    if (endivinat) {
      const estadistiques = {
        word: paraulaAEndevinar,
        errors: varErrors,
        time: formatTemps(temps.getTime()),
      };
      const historialEstadistiques = JSON.parse(localStorage.getItem('historialEstadistiques')) || [];
      historialEstadistiques.push(estadistiques);
      localStorage.setItem('historialEstadistiques', JSON.stringify(historialEstadistiques));

      popupTitol.innerHTML = "¡Felicitaciones, has ganado!";
      popupMissatge.innerHTML = "¡Has adivinado la palabra correctamente!<br><br>ESTADÍSTICAS<br>Palabra: " + estadistiques.word + "<br>Errores: " + estadistiques.errors + "<br>Tiempo: " + estadistiques.time;

      botoTancar.style.display = "none";

      setTimeout(() => {
        window.location.href = "../../Historia/Dificil/prova3.html";
      }, 2000);
    } else {
      popupTitol.innerHTML = "Has perdido";
      popupMissatge.innerHTML = "La palabra a adivinar era: " + paraulaAEndevinar;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    popup.style.display = "flex";
  }
}

// Función para comenzar el juego
function començar() {
  interval = setInterval(crono, 1000);
}

// Función para reiniciar el cronómetro
function reiniciar() {
  temps.setHours(0, 0, 0, 0);
  hores.innerHTML = "00";
  minuts.innerHTML = "00";
  segons.innerHTML = "00";
}

// Función para detener el cronómetro
function aturar() {
  clearInterval(interval);
}

// Función para seleccionar una palabra aleatoria de una categoría
function paraulaAleatoria(categoria) {
  obtenirJSON((error, dades) => {
    gestionaResposta(error, dades);
    paraulaAEndevinar = jsonArray[Math.floor(Math.random() * jsonArray.length)];
    caractersEndivitats = Array(paraulaAEndevinar.length);

    console.log(paraulaAEndevinar);

    for (let index = 0; index < paraulaAEndevinar.length; index++) {
      caractersEndivitats[index] = false;
      paraula.innerText += " _ ";
    }
  }, "JSON/" + categoria + ".json");
}

// Función para obtener datos JSON mediante una solicitud XMLHttpRequest
const obtenirJSON = (callback, source) => {
  const peticio = new XMLHttpRequest();

  peticio.addEventListener("readystatechange", () => {
    if (peticio.readyState == 4 && peticio.status == 200) {
      const respuesta = JSON.parse(peticio.responseText);
      callback(undefined, respuesta);
    } else if (peticio.readyState === 4) {
      callback("No se pudieron obtener los datos", undefined);
    }
  });

  peticio.open("GET", source);
  peticio.send();
};

// Función para gestionar la respuesta JSON
function gestionaResposta(error, dades) {
  if (error) {
    console.log(error);
  } else {
    jsonArray = dades;
  }
}

// Agregar evento al botón de cerrar del popup
const botoTancar = document.getElementById("boto-tancar");
botoTancar.addEventListener("click", () => {
  popup.style.display = "none";
  window.location.reload();
});

// Agregar evento al botón de inicio
boto.addEventListener("click", (e) => {
  boto.disabled = true;
  iniciarPartida();
});

// Agregar evento al teclado
teclat.addEventListener("click", (e) => {
  let element = e.target;
  if (element.classList.contains("lletra")) {
    avançarTorn(element);
  }
});

// Función para actualizar el temporizador
function actualizarTemporizador() {
  let temporizadorElement = document.getElementById("temporizador");
  
  let tiempoInicial = localStorage.getItem('tiempoInicial');
  
  if (tiempoInicial !== null) {
      let tiempoTranscurrido = Math.floor((new Date() - new Date(tiempoInicial)) / 1000);

      let minutos = Math.floor(tiempoTranscurrido / 60);
      let segundos = tiempoTranscurrido % 60;

      segundos = segundos < 10 ? "0" + segundos : segundos;

      temporizadorElement.textContent = "Tiempo transcurrido: " + minutos + ":" + segundos + " segundos";
  }
}

// Actualizar el temporizador cada segundo
setInterval(actualizarTemporizador, 1000);