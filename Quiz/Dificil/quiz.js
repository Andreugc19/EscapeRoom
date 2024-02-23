// Función para barajar el array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var questionBank= [
    {
        question : 'Eritrea, which became the 182nd member of the UN in 1993, is in the continent of',
        option : ['Asia','Africa','Europe','Australia'],
        answer : 'Africa'
    },
    {
        question : 'Garampani sanctuary is located at',
        option : ['Junagarh, Gujarat','Diphu, Assam','Kohima, Nagaland','Gangtok, Sikkim'],
        answer : 'Diphu, Assam'
    },
    {
        question : 'For which of the following disciplines is Nobel Prize awarded?',
        option : ['Physics and Chemistry','Physiology or Medicine','Literature, Peace and Economics','All of the above'],
        answer : 'All of the above'
    },
    {
        question : 'Hitler party which came into power in 1933 is known as',
        option : ['Labour Party','Nazi Party','Ku-Klux-Klan','Democratic Party'],
        answer : 'Nazi Party'
    },
    {
        question : 'First human heart transplant operation conducted by Dr. Christiaan Barnard on Louis Washkansky, was conducted in',
        option : ['1967','1968','1958','1922'],
        answer : '1967'
    },
    {
        question : 'Question 6?',
        option : ['Option A','Option B','Option C','Option D'],
        answer : 'Option A'
    },
    {
        question : 'Question 7?',
        option : ['Option A','Option B','Option C','Option D'],
        answer : 'Option B'
    },
    {
        question : 'Question 8?',
        option : ['Option A','Option B','Option C','Option D'],
        answer : 'Option C'
    },
    {
        question : 'Question 9?',
        option : ['Option A','Option B','Option C','Option D'],
        answer : 'Option D'
    },
    {
        question : 'Question 10?',
        option : ['Option A','Option B','Option C','Option D'],
        answer : 'Option A'
    }
];

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

        if(score >= 7){
            showPopup("¡Felicidades! Has ganado.");
            setTimeout(function(){
                window.location.href = "../../Historia/Dificil/final.html";
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