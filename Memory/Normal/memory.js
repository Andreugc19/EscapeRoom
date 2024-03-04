var score = 0;
var cardList = [
    "Chariot",
    "Empress",
    "Floor",
    "Fortune",
    "Hermit",
    "Hierophant",
    "Judgement",
    "Lovers"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 4;
var card1Selected;
var card2Selected;
var timerInterval;
var timeLimit = 90;

// Función para iniciar el juego
window.onload = function() {
    shuffleCards();
    startGame();
    hideCards();
    startTimer();
};

// Función para reiniciar el juego
function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("board").innerHTML = ''; 
    shuffleCards();
    startGame();
    hideCards();
    startTimer();
}

// Funcion de barajar las cartas
function shuffleCards() {
    cardSet = cardList.concat(cardList);
    console.log(cardSet);
    
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

// Funcion de empezar juego
function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("div");
            card.id = r.toString() + "-" + c.toString();
            card.classList.add("card");

            // Crear elemento img para la carta
            let cardImgElement = document.createElement("img");
            cardImgElement.src = "../img/back.jpg";
            cardImgElement.classList.add("card-img");
            cardImgElement.setAttribute("data-card", cardImg);
            card.appendChild(cardImgElement);

            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

// Funcion de ocultar carta
function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString()).querySelector('img');
            card.src = "../img/back.jpg";
        }
    }
}

// Funcion de seleccionar las cartas
function selectCard() {
    if (!card1Selected && !card2Selected && !this.classList.contains("flipped")) {
        card1Selected = this;
        let coords = card1Selected.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        card1Selected.querySelector('img').src = "../img/" + board[r][c] + ".jpg";
        card1Selected.classList.add("flipped");
        return; 
    }

    if (!card2Selected && this !== card1Selected && !this.classList.contains("flipped")) {
        card2Selected = this;
        let coords = card2Selected.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        card2Selected.querySelector('img').src = "../img/" + board[r][c] + ".jpg";
        card2Selected.classList.add("flipped");
        setTimeout(update, 1000);
    }
}

// Funcion de actualizar las cartas
function update() {
    if (card1Selected && card2Selected) {
        if (card1Selected.querySelector('img').src === card2Selected.querySelector('img').src) {
            // Coincidencia
            card1Selected.classList.add("matched");
            card2Selected.classList.add("matched");
            card1Selected = null;
            card2Selected = null;
            score += 20;
            document.getElementById("score").innerText = score;
            setTimeout(checkGameEnd, 500);
        } else {
            // No coincidencia
            score -= 5;
            document.getElementById("score").innerText = score;
            setTimeout(() => {
                card1Selected.querySelector('img').src = "../img/back.jpg";
                card2Selected.querySelector('img').src = "../img/back.jpg";
                card1Selected.classList.remove("flipped");
                card2Selected.classList.remove("flipped");
                card1Selected = null;
                card2Selected = null;
            }, 200);
        }
    }
}

// Funcion de empezar el tiempo
function startTimer() {
    let seconds = timeLimit;
    timerInterval = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            clearInterval(timerInterval);
            showLossPopup();
            return;
        }
        let minutes = Math.floor(seconds / 60);
        let remainderSeconds = seconds % 60;
        document.getElementById("timer").innerText = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    }, 1000);
}

// Funcion de popups de victoria y derrota
function showWinPopup() {
    var popupContainer = document.getElementById("popup-container");
    var popupMessage = document.getElementById("popup-message");
    popupMessage.innerHTML = "¡Felicidades! Has ganado.";
    popupContainer.style.display = "block";
    setTimeout(function() {
        window.location.href = "../../Historia/Normal/prova2.html";
    }, 2000);
}

function showLossPopup() {
    var popupContainer = document.getElementById("popup-container");
    var popupMessage = document.getElementById("popup-message");
    popupMessage.innerHTML = "¡Has perdido! Tienes que jugar de nuevo.";
    popupContainer.style.display = "block";
    setTimeout(function() {
        location.reload();
    }, 2000);
}

// Funcion de juego acabado
function checkGameEnd() {
    let allMatched = true;
    document.querySelectorAll('.card').forEach(card => {
        if (!card.classList.contains("matched")) {
            allMatched = false;
        }
    });
    if (allMatched) {
        clearInterval(timerInterval);
        showWinPopup();
    }
}

document.getElementById("hint-button").addEventListener("click", provideHint);

// Funcion de generar pista
function provideHint() {
    let unmatchedCards = document.querySelectorAll('.card:not(.matched)');
    if (unmatchedCards.length > 0) {
        let randomIndex = Math.floor(Math.random() * unmatchedCards.length);
        let randomCard = unmatchedCards[randomIndex];
        let cardImg = randomCard.querySelector('img');
        let cardType = cardImg.getAttribute("data-card");
        cardImg.src = "../img/" + cardType + ".jpg";
        randomCard.classList.add("flipped");
        setTimeout(() => {
            cardImg.src = "../img/back.jpg";
            randomCard.classList.remove("flipped");
        }, 1000);
        
        score -= 5;
        document.getElementById("score").innerText = score;
    }
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