/*
=====================================================
PINK SHIRT DAY
Quiz moderno
=====================================================
*/

/* ELEMENTOS */

const startScreen =
  document.getElementById("start-screen");

const quizContent =
  document.getElementById("quiz-content");

const startButton =
  document.getElementById("start-btn");

const questionElement =
  document.getElementById("question");

const answersElement =
  document.getElementById("answers");

const nextButton =
  document.getElementById("next-btn");

const progressBar =
  document.getElementById("progress-bar");

const questionCount =
  document.getElementById("question-count");

const resultCard =
  document.getElementById("result-card");

const scoreText =
  document.getElementById("score-text");

const medal =
  document.getElementById("medal");

const bestScore =
  document.getElementById("best-score");

const timerText =
  document.getElementById("timer-text");

const clickSound =
  document.getElementById("click-sound");

const themeToggle =
  document.getElementById("theme-toggle");

/* QUIZ */

let currentQuestion = 0;
let score = 0;

let timer;
let timeLeft = 20;

/* DARK MODE */

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});

/* PERGUNTAS */

const questions = [

  {
    question:"O que significa o Pink Shirt Day?",
    answers:[
      {text:"Combate ao bullying",correct:true},
      {text:"Festival de moda",correct:false},
      {text:"Dia esportivo",correct:false},
      {text:"Evento musical",correct:false},
    ]
  },

  {
    question:"Empatia significa:",
    answers:[
      {text:"Entender sentimentos do outro",correct:true},
      {text:"Ignorar pessoas",correct:false},
      {text:"Competir sempre",correct:false},
      {text:"Falar apenas de si",correct:false},
    ]
  },

  {
    question:"Cyberbullying acontece:",
    answers:[
      {text:"Na internet",correct:true},
      {text:"No trânsito",correct:false},
      {text:"Somente em jogos",correct:false},
      {text:"Na televisão",correct:false},
    ]
  },

  {
    question:"Respeitar diferenças é:",
    answers:[
      {text:"Aceitar diversidade",correct:true},
      {text:"Excluir pessoas",correct:false},
      {text:"Julgar aparência",correct:false},
      {text:"Criar grupos fechados",correct:false},
    ]
  },

  {
    question:"Bullying pode causar:",
    answers:[
      {text:"Ansiedade",correct:true},
      {text:"Somente felicidade",correct:false},
      {text:"Nada",correct:false},
      {text:"Diversão saudável",correct:false},
    ]
  },

  {
    question:"Uma atitude correta é:",
    answers:[
      {text:"Ajudar a vítima",correct:true},
      {text:"Filmar bullying",correct:false},
      {text:"Rir da situação",correct:false},
      {text:"Ignorar sempre",correct:false},
    ]
  },

  {
    question:"A inclusão:",
    answers:[
      {text:"Une pessoas",correct:true},
      {text:"Gera exclusão",correct:false},
      {text:"Cria preconceito",correct:false},
      {text:"Afasta amizades",correct:false},
    ]
  },

  {
    question:"O respeito melhora:",
    answers:[
      {text:"A convivência",correct:true},
      {text:"Os conflitos",correct:false},
      {text:"A exclusão",correct:false},
      {text:"A violência",correct:false},
    ]
  },

  {
    question:"Gentileza pode:",
    answers:[
      {text:"Criar ambientes positivos",correct:true},
      {text:"Gerar medo",correct:false},
      {text:"Criar brigas",correct:false},
      {text:"Separar pessoas",correct:false},
    ]
  },

  {
    question:"Bullying verbal inclui:",
    answers:[
      {text:"Insultos ofensivos",correct:true},
      {text:"Elogios",correct:false},
      {text:"Ajuda",correct:false},
      {text:"Conselhos",correct:false},
    ]
  },

  {
    question:"Uma escola saudável deve:",
    answers:[
      {text:"Promover respeito",correct:true},
      {text:"Aceitar bullying",correct:false},
      {text:"Punir vítimas",correct:false},
      {text:"Criar exclusão",correct:false},
    ]
  },

  {
    question:"Empatia ajuda a:",
    answers:[
      {text:"Entender emoções",correct:true},
      {text:"Criar preconceitos",correct:false},
      {text:"Aumentar conflitos",correct:false},
      {text:"Separar grupos",correct:false},
    ]
  },

  {
    question:"O apoio dos amigos:",
    answers:[
      {text:"Fortalece emocionalmente",correct:true},
      {text:"Não ajuda",correct:false},
      {text:"Aumenta medo",correct:false},
      {text:"Piora relações",correct:false},
    ]
  },

  {
    question:"Pink Shirt Day promove:",
    answers:[
      {text:"Respeito e inclusão",correct:true},
      {text:"Competição extrema",correct:false},
      {text:"Exclusão social",correct:false},
      {text:"Violência",correct:false},
    ]
  },

  {
    question:"Combater bullying significa:",
    answers:[
      {text:"Criar ambientes seguros",correct:true},
      {text:"Espalhar ofensas",correct:false},
      {text:"Excluir colegas",correct:false},
      {text:"Incentivar medo",correct:false},
    ]
  }

];

/* INICIAR */

startButton.addEventListener("click", () => {

  playSound();

  startScreen.classList.add("hidden");

  quizContent.classList.remove("hidden");

  showQuestion();

});

/* SOM */

function playSound(){

  clickSound.currentTime = 0;

  clickSound.play();

}

/* MOSTRAR */

function showQuestion(){

  resetState();

  startTimer();

  const current = questions[currentQuestion];

  questionCount.innerHTML =
    `Questão ${currentQuestion + 1} de ${questions.length}`;

  questionElement.innerHTML =
    current.question;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  current.answers.forEach(answer => {

    const button =
      document.createElement("button");

    button.innerHTML = answer.text;

    button.classList.add("answer-btn");

    answersElement.appendChild(button);

    if(answer.correct){
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);

  });

}

/* RESET */

function resetState(){

  nextButton.style.display = "none";

  while(answersElement.firstChild){

    answersElement.removeChild(
      answersElement.firstChild
    );

  }

}

/* TIMER */

function startTimer(){

  clearInterval(timer);

  timeLeft = 20;

  timerText.innerHTML = timeLeft;

  timer = setInterval(() => {

    timeLeft--;

    timerText.innerHTML = timeLeft;

    if(timeLeft <= 0){

      clearInterval(timer);

      autoNext();

    }

  },1000);

}

/* AUTO */

function autoNext(){

  Array.from(answersElement.children)
    .forEach(button => {

      button.disabled = true;

      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }

    });

  nextButton.style.display = "block";

}

/* ANSWER */

function selectAnswer(e){

  playSound();

  clearInterval(timer);

  const selectedBtn = e.target;

  const isCorrect =
    selectedBtn.dataset.correct === "true";

  if(isCorrect){

    selectedBtn.classList.add("correct");

    score++;

  } else {

    selectedBtn.classList.add("wrong");

  }

  Array.from(answersElement.children)
    .forEach(button => {

      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }

      button.disabled = true;

    });

  nextButton.style.display = "block";

}

/* NEXT */

nextButton.addEventListener("click", () => {

  playSound();

  currentQuestion++;

  if(currentQuestion < questions.length){

    showQuestion();

  } else {

    showResult();

  }

});

/* RESULT */

function showResult(){

  quizContent.classList.add("hidden");

  resultCard.classList.remove("hidden");

  progressBar.style.width = "100%";

  scoreText.innerHTML =
    `Você acertou ${score} de ${questions.length} perguntas`;

  /* Medalha */

  if(score >= 13){

    medal.innerHTML =
      "🏆 Excelente! Você promove empatia.";

  } else if(score >= 8){

    medal.innerHTML =
      "💖 Muito bem! Continue espalhando respeito.";

  } else {

    medal.innerHTML =
      "🌸 Continue aprendendo sobre empatia.";

  }

  /* Ranking */

  let best =
    localStorage.getItem("pinkBest");

  if(!best || score > best){

    localStorage.setItem("pinkBest",score);

    best = score;

  }

  bestScore.innerHTML =
    `${best} pontos`;

}