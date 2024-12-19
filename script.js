const questions = [
    {
        question: "Which is the largest animal in the world?",
        image: "images/blue-whale.jpeg",
        explanation: "The Blue Whale is the largest animal ever known to exist on Earth, growing up to 100 feet long and weighing up to 200 tons.",
        audioExplanation:"explanation-audio/question1-audio.wav",
        answers: [
            { text: "Cow", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
    },
    {
        question: "What is the largest planet in our solar system?",
        image: "images/jupiter.jpeg",
        explanation: "Jupiter is the largest planet in our solar system, with a mass more than two and a half times that of all the other planets combined.",
        audioExplanation:"explanation-audio/question2-audio.wav",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true},
            { text: "Mercury", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "What is the largest land mammal in the world?",
        image: "images/elephant.jpeg",
        explanation: "The African Bush Elephant is the largest land mammal, with adult males weighing up to 6 tons and standing 10-13 feet tall at the shoulder.",
        audioExplanation:"explanation-audio/question3-audio.wav",
        answers: [
            { text: "Elephant", correct: true },
            { text: "Octopus", correct: false },
            { text: "Shark", correct: false },
            { text: "Buffalo", correct: false },
        ]
    },
    {
        question: "Who was the first president of Kenya?",
        image: "images/jomo-kenyatta.jpeg",
        explanation: "Jomo Kenyatta was a Kenyan independence leader who served as the first President of Kenya from 1964 to 1978.",
        audioExplanation:"explanation-audio/question4-audio.wav",
        answers: [
            { text: "William Ruto", correct: false },
            { text: "Uhuru Kenyatta", correct: false },
            { text: "Jomo Kenyatta", correct: true },
            { text: "Julius Nyerere", correct: false },
        ]
    },
    {
        question: "How many counties are there in Kenya?",
        image: "images/kenya-map.jpeg",
        explanation: "Kenya is divided into 47 counties, each with its own local government and unique characteristics.",
        audioExplanation:"explanation-audio/question5-audio.wav",
        answers: [
            { text: "197", correct: false },
            { text: "7", correct: false },
            { text: "40", correct: false },
            { text: "47", correct: true},
        ]
    },
    {
        question: "Which is the most expensive car in this list",
        image: "images/bentley-continental.jpeg",
        explanation: "The Bentley Continental GT is a luxury grand tourer known for its exceptional craftsmanship and high price point, often costing over $200,000.",
        audioExplanation:"explanation-audio/question6-audio.wav",
        answers: [
            { text: "Toyota Corolla", correct: false },
            { text: "Bentley Continental GT", correct: true },
            { text: "Chevrolet Impala", correct: false },
            { text: "Nissan Note", correct: false },
        ]
    },
    {
        question: "When did the Kenyan Youth enter Parliament Buildings?",
        image: "images/youth-demos.jpeg",
        explanation: "The Kenyan Youth entered Parliament Buildings on 25th June, marking a significant moment in the country's political history.",
        answers: [
            { text: "7th July", correct: false },
            { text: "25th June", correct: true },
            { text: "12th December", correct: false },
            { text: "14th February", correct: false },
        ]
    },
    {
        question: "What is the IP address acronym in full",
        image: "images/internet-protocol.jpeg",
        explanation: "IP stands for Internet Protocol, which is a set of rules governing how data is sent over the internet from one computer to another.",
        answers: [
            { text: "Independent Port", correct: false },
            { text: "Identical Path", correct: false },
            { text: "Internet Protocol", correct: true },
            { text: "Index Pattern", correct: false },
        ]
    },
    {
        question: "How many members are there in the national assembly",
        image: "images/kenya-national-assembly.jpeg",
        explanation: "The Kenyan National Assembly consists of 290 members, including elected constituency representatives.",
        answers: [
            { text: "190", correct: false },
            { text: "230", correct: false },
            { text: "150", correct: false },
            { text: "290", correct: true},
        ]
    },
    {
        question: "How many colours are there in the National Kenyan Flag",
        image: "images/kenya-flag.jpeg",
        explanation: "The Kenyan flag has 4 colors: black, red, green, and white, each representing different aspects of the country's history and people.",
        answers: [
            { text: "4", correct: true },
            { text: "2", correct: false },
            { text: "5", correct: false },
            { text: "3", correct: false },
        ]
    }
];

const questionElement =  document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");

const correctSound = new Audio('correct-sound.wav');
const incorrectSound = new Audio('wrong-answer.wav');
let explanationAudio = null;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = `Question ${questionNo}: ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    resultContainer.innerHTML = "";
    if(explanationAudio) {
        explanationAudio.pause();
        explanationAudio = null;
    }
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function playExplanationAudio(audioPath) {
    if (explanationAudio) {
        explanationAudio.pause();
    }
    explanationAudio = new Audio(audioPath);
    explanationAudio.play();
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const currentQuestion =questions[currentQuestionIndex];
    const isCorrect = selectedBtn.dataset.correct === "true";

    //This is the container that will display the image and explanation
    const resultHTML = `
        <div class="result-details">
            <img src="${currentQuestion.image}" alt="${currentQuestion.question}" class="question-image">
            <p class="explanation">${currentQuestion.explanation}</p>
            ${currentQuestion.audioExplanation ? `
                <button class="btn explanation-audio-btn" onclick="playExplanationAudio('${currentQuestion.audioExplanation}')">
                    🔊 Listen to Explanation
                </button>
            ` : ''}
        </div>
    `;

    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        // Play correct sound
        correctSound.play();
    }else{
        selectedBtn.classList.add("incorrect");
        // Play incorrect sound
        incorrectSound.play();
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    
    resultContainer.innerHTML = resultHTML;
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of
    ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }

})

startQuiz();