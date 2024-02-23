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
var timeLimit = 90; // Tiempo por defecto (en segundos)

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
    document.getElementById("board").innerHTML = ''; // Limpiar el tablero
    shuffleCards();
    startGame();
    hideCards();
    startTimer();
}

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

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("div"); // Cambiado de img a div
            card.id = r.toString() + "-" + c.toString();
            card.classList.add("card");

            // Crear elemento img para la carta
            let cardImgElement = document.createElement("img");
            cardImgElement.src = "../img/back.jpg";
            cardImgElement.classList.add("card-img");
            cardImgElement.setAttribute("data-card", cardImg); // Guardar el tipo de carta como atributo de datos
            card.appendChild(cardImgElement);

            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString()).querySelector('img');
            card.src = "../img/back.jpg";
        }
    }
}

function selectCard() {
    if (!card1Selected && !card2Selected && !this.classList.contains("flipped")) {
        card1Selected = this;
        let coords = card1Selected.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        card1Selected.querySelector('img').src = "../img/" + board[r][c] + ".jpg";
        card1Selected.classList.add("flipped");
        return; // Salir de la función después de seleccionar la primera carta
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

function update() {
    if (card1Selected && card2Selected) {
        if (card1Selected.querySelector('img').src === card2Selected.querySelector('img').src) {
            // Coincidencia
            card1Selected.classList.add("matched");
            card2Selected.classList.add("matched");
            card1Selected = null;
            card2Selected = null;
            score += 20; // Sumar 20 puntos por coincidencia
            document.getElementById("score").innerText = score; // Actualizar la puntuación en el DOM
            setTimeout(checkGameEnd, 500);
        } else {
            // No coincidencia
            score -= 5; // Restar 5 puntos por error
            document.getElementById("score").innerText = score; // Actualizar la puntuación en el DOM
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