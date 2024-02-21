var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;

var choices = ["pedra", "paper", "tissores"];

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice)
        document.getElementById("choices").append(choice);
    }
}

function selectChoice() {
    you = this.id;
    document.getElementById("your-choice").src = you + ".png";
    
    opponent = choices[Math.floor(Math.random() * 3)];
    document.getElementById("opponent-choice").src = opponent + ".png";

    if (you == opponent) {
        yourScore += 1;
        opponentScore += 1;
    } else {
        if (you == "pedra") {
            if (opponent == "tissores") {
                yourScore +=1;
            } else if (opponent == "paper") {
                opponentScore +=1;
            }
        }
        else if (you == "tissores") {
            if (opponent == "paper") {
                yourScore +=1;
            } else if (opponent == "pedra") {
                opponentScore +=1;
            }
        }

        else if (you == "paper") {
            if (opponent == "pedra") {
                yourScore +=1;
            } else if (opponent == "tissores") {
                opponentScore +=1;
            }
        }
    }

    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("opponent-score").innerText = opponentScore;
}