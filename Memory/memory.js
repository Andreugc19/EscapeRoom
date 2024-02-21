var errors = 0;
var score = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 4; // Cambiado a 4
var card1Selected;
var card2Selected;
var timerInterval;
var timeLimit = 90; // Tiempo límite en segundos (1 minuto y medio)

window.onload = function() {
    shuffleCards();
    startGame();
    hideCards();
    startTimer();
};

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
            cardImgElement.src = "img/back.jpg";
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
            card.src = "img/back.jpg";
        }
    }
}

function selectCard() {
    if (!card1Selected && !card2Selected) {
        if (this.querySelector('img').src.includes("back")) {
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1Selected.querySelector('img').src = "img/" + board[r][c] + ".jpg";
            card1Selected.classList.add("flipped");
        }
    } else if (!card2Selected && this != card1Selected) {
        if (this.querySelector('img').src.includes("back")) {
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2Selected.querySelector('img').src = "img/" + board[r][c] + ".jpg";
            card2Selected.classList.add("flipped");
            setTimeout(update, 1000);
        }
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
            errors += 1;
            score -= 5; // Restar 5 puntos por error
            document.getElementById("errors").innerText = errors;
            document.getElementById("score").innerText = score; // Actualizar la puntuación en el DOM
            setTimeout(() => {
                card1Selected.querySelector('img').src = "img/back.jpg";
                card2Selected.querySelector('img').src = "img/back.jpg";
                card1Selected.classList.remove("flipped");
                card2Selected.classList.remove("flipped");
                card1Selected = null;
                card2Selected = null;
            }, 200);
        }
    }
}

function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        let minutes = Math.floor(seconds / 60);
        let remainderSeconds = seconds % 60;
        document.getElementById("timer").innerText = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        
        if (seconds >= timeLimit) {
            clearInterval(timerInterval);
            alert("¡Tiempo agotado!");
            window.location.reload(); // Recargar la página
        }
    }, 1000);
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
        alert("¡Has ganado!");
        setTimeout(function() {
            window.location.href = "../Penjat/index.html";
        }, 500);
    }
}