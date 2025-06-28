// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");



// QUIZ QUESTIONS   

const quizQuestions = [
  {
    question: "What is the name of the first coding language?",
    answers: [
      { text: "FORTRAN", correct: false },
      { text: "C", correct: false },
      { text: "Plankalkül", correct: true },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "Which City is considered the birthplace of the digital computer?",
    answers: [
      { text: "Silicon Valley", correct: false },
      { text: "Philly", correct: true },
      { text: "NYC", correct: false },
      { text: "Cambridge", correct: false },
    ],
  },
  {
    question: "Who is the pioneer of Computer Science and Software Development?",
    answers: [
      { text: "Edsger Dijkstra", correct: false },
      { text: "Fred Brooks", correct: false },
      { text: "Grace Hopper", correct: false },
      { text: "Margaret Hamilton", correct: true },
    ],
  },
  {
    question: "Who is the creator of Apple?",
    answers: [
      { text: "Steve Wozniak", correct: false },
      { text: "Ronald Wayne", correct: false },
      { text: "Steve Jobs", correct: true },
      { text: "Debi Coleman", correct: false },
    ],
  },
  {
    question: "What is the best coding language?",
    answers: [
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "All of them because coding is fun", correct: true },
    ],
  },
];


// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


//EVENT LISTENERS

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    restartButton.style.display = "none"; // hide restart button
    scoreSpan.style.display = "inline";   // show score when quiz starts

    showQuestion()
}

function showQuestion() {
    // reset state
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    //update progress bar
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100; 
    progressBar.style.width = progressPercent + "%"
    

    //update question text
    questionText.textContent = currentQuestion.question

    //clear previous answer list to show next set of answers
    //or it will show previous questions along with new set of questions
    //VERY IMPORTANT
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")


        // "dataset" allows you to store custom data 

        //how to know if true or false
        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)

        //add it into UI
        answersContainer.appendChild(button)
    })
}

function selectAnswer(event) {
    if(answersDisabled) return

    answersDisabled = true
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

   
   //
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
        button.classList.add("correct") 
        
        } else if (button === selectedButton) {
            button.classList.add("incorrect")

        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout( () => {
        currentQuestionIndex++;

        //check if there are more questions/quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
       
        } else {
            showResults()
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;
     restartButton.style.display = "inline"; // show restart button


    const percentage = (score/quizQuestions.length) *100

    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're brilliant!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You're very smart!"
    } else if (percentage >= 60) {
        resultMessage.textContent = "Great effort! Keep learning!"
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not Bad! But you can improve!"
    } else {
        resultMessage.textContent = "Keep studying! I believe in you!"
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active")

    startQuiz();
}

