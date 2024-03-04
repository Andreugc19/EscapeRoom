var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;
var maxScore = 2; // Número máximo de victorias para ganar

var choices = ["pedra", "paper", "tisores"];

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = "../img/" + choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }
}

// Funcion para seleccionar una de las opciones
function selectChoice() {
    you = this.id;
    document.getElementById("your-choice").src = "../img/" + you + ".png";

    opponent = choices[Math.floor(Math.random() * 3)];
    document.getElementById("opponent-choice").src = "../img/" + opponent + ".png";

    if (you != opponent) {
        if (you == "pedra") {
            if (opponent == "tisores") {
                yourScore += 1;
            } else if (opponent == "paper") {
                opponentScore += 1;
            }
        } else if (you == "tisores") {
            if (opponent == "paper") {
                yourScore += 1;
            } else if (opponent == "pedra") {
                opponentScore += 1;
            }
        } else if (you == "paper") {
            if (opponent == "pedra") {
                yourScore += 1;
            } else if (opponent == "tisores") {
                opponentScore += 1;
            }
        }
    }

    document.getElementById("your-score").innerText = "You: " + yourScore;
    document.getElementById("opponent-score").innerText = "Opponent: " + opponentScore;
    
    // Verificar si alguien ha ganado
    if (yourScore >= maxScore) {
        showWinPopup();
        setTimeout(function() {
            window.location.href = "../../Historia/Normal/prova4.html";
        }, 3000);
    } else if (opponentScore >= maxScore) {
        showLossPopup();
        setTimeout(function() {
            location.reload();
        }, 3000);
    }
}

// Mostrar los popups de victoria y derrota
function showWinPopup() {
    var popupContainer = document.getElementById("popup-container");
    var popupMessage = document.getElementById("popup-message");
    popupMessage.innerHTML = "¡Felicidades! Has ganado. Pasas a la siguiente fase.";
    popupContainer.style.display = "block";
}

function showLossPopup() {
    var popupContainer = document.getElementById("popup-container");
    var popupMessage = document.getElementById("popup-message");
    popupMessage.innerHTML = "¡Has perdido! Tienes que jugar de nuevo.";
    popupContainer.style.display = "block";
}

// Función para mostrar el popup con la pista
function showHintPopup() {
    var popupContainer = document.getElementById("hint-popup-container");
    var popupMessage = document.getElementById("hint-popup-message");
    popupMessage.innerHTML = "Es un pedra, paper, tisores, que te esperaves que te dones la solucio? Espavila i guanya.";
    popupContainer.style.display = "block";

    // Ocultar el popup después de 2 segundos
    setTimeout(function() {
        popupContainer.style.display = "none";
    }, 2500);
}

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