var questionBank= [
    {
        question : '¿Cuál de estos pintores no es italiano?',
        option : ['Pablo Picasso','Leonardo da Vinci','Tiziano Vecellio','Caravaggio'],
        answer : 'Pablo Picasso'
    },
    {
        question : '¿Gracias a qué instrumento podemos ver la Tierra desde el espacio?',
        option : ['Brujula','Luna','Satelite','GPS'],
        answer : 'Satelite'
    },
    {
        question : '¿Quién fue el primer presidente de Estados Unidos?',
        option : ['John Adams','ames Madison','Thomas Jefferson','George Washington'],
        answer : 'George Washington'
    },
    {
        question : '¿Cuál es el gas más abundante en la atmósfera de la Tierra?',
        option : ['Helio','Nitrogeno','Oxigeno','Sodio'],
        answer : 'Nitrogeno'
    },
    {
        question : '¿Qué deporte es considerado el “rey de los deportes”?',
        option : ['Futbol','Golf','Baloncesto','Tenis'],
        answer : 'Futbol'
    }
];

// Función para barajar el array questionBank
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Barajar el array questionBank
questionBank = shuffleArray(questionBank);

var question= document.getElementById('question');
var quizContainer= document.getElementById('quiz-container');
var scoreboard= document.getElementById('scoreboard');
var option0= document.getElementById('option0');
var option1= document.getElementById('option1');
var option2= document.getElementById('option2');
var option3= document.getElementById('option3');
var next= document.querySelector('.next');
var points= document.getElementById('score');
var stat= document.getElementById('stat');
var span= document.querySelectorAll('span');
var i=0;
var score= 0;

function displayQuestion(){
    for(var a=0;a<span.length;a++){
        span[a].style.background='none';
    }
    question.innerHTML= 'Q.'+(i+1)+' '+questionBank[i].question;
    option0.innerHTML= questionBank[i].option[0];
    option1.innerHTML= questionBank[i].option[1];
    option2.innerHTML= questionBank[i].option[2];
    option3.innerHTML= questionBank[i].option[3];
    stat.innerHTML= "Question"+' '+(i+1)+' '+'of'+' '+questionBank.length;
}

function calcScore(e){
    if(e.innerHTML===questionBank[i].answer && score<questionBank.length)
    {
        score= score+1;
        document.getElementById(e.id).style.background= 'limegreen';
    }
    else{
        document.getElementById(e.id).style.background= 'tomato';
    }
    setTimeout(nextQuestion,300);
}

function nextQuestion(){
    if(i<questionBank.length-1)
    {
        i=i+1;
        displayQuestion();
    }
    else{
        points.innerHTML= score+ '/'+ questionBank.length;
        quizContainer.style.display= 'none';
        scoreboard.style.display= 'block';

        if(score >= 3){
            showPopup("¡Felicidades! Has ganado.");
            setTimeout(function(){
                window.location.href = "../../Historia/Normal/final.html";
            }, 3000);
        } else {
            showPopup("¡Lo siento! Has perdido. Inténtalo de nuevo.");
            setTimeout(function(){
                location.reload();
            }, 3000);
        }
    }
}

next.addEventListener('click',nextQuestion);

function backToQuiz(){
    location.reload();
}

function showPopup(message) {
    var popupContainer = document.getElementById("popup-container");
    var popupMessage = document.getElementById("popup-message");

    popupMessage.innerHTML = message;
    popupContainer.style.display = "block";

    setTimeout(function() {
        popupContainer.style.display = "none";
        if (message.includes("¡Felicidades!")) {
            window.location.href = "../index.html";
        } else {
            backToQuiz();
        }
    }, 3000); // Cierra automáticamente el popup después de 3 segundos (3000 milisegundos)
}

displayQuestion();

// Función para actualizar el temporizador
function actualizarTemporizador() {
    // Obtener el elemento del temporizador
    let temporizadorElement = document.getElementById("temporizador");
    
    // Obtener el tiempo inicial del almacenamiento local
    let tiempoInicial = localStorage.getItem('tiempoInicial');
    
    if (tiempoInicial !== null) {
        // Calcular el tiempo transcurrido
        let tiempoTranscurrido = Math.floor((new Date() - new Date(tiempoInicial)) / 1000);

        // Calcular minutos y segundos
        let minutos = Math.floor(tiempoTranscurrido / 60);
        let segundos = tiempoTranscurrido % 60;

        // Añadir un cero delante de los segundos si es necesario
        segundos = segundos < 10 ? "0" + segundos : segundos;

        // Actualizar el contenido del elemento del temporizador
        temporizadorElement.textContent = "Tiempo transcurrido: " + minutos + ":" + segundos + " segundos";
    }
}

// Actualizar el temporizador cada segundo
setInterval(actualizarTemporizador, 1000);