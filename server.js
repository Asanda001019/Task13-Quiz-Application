// Step 1: Import the required modules
const readline = require('readline');

// Step 2: Create an array of quiz questions
const quiz = [
    { question: "What is the capital of France?", options: ["a) Paris", "b) Rome", "c) Berlin", "d) Madrid"], correct: "a" },
    { question: "What is 2 + 2?", options: ["a) 3", "b) 4", "c) 5", "d) 6"], correct: "b" },
    { question: "Which planet is known as the Red Planet?", options: ["a) Earth", "b) Mars", "c) Jupiter", "d) Venus"], correct: "b" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["a) Harper Lee", "b) J.K. Rowling", "c) Ernest Hemingway", "d) Mark Twain"], correct: "a" },
    { question: "What is the largest mammal?", options: ["a) Elephant", "b) Whale", "c) Shark", "d) Giraffe"], correct: "b" },
    { question: "Which element has the chemical symbol 'O'?", options: ["a) Oxygen", "b) Hydrogen", "c) Gold", "d) Helium"], correct: "a" },
    { question: "What is the speed of light?", options: ["a) 300,000 km/s", "b) 150,000 km/s", "c) 450,000 km/s", "d) 600,000 km/s"], correct: "a" },
    { question: "Who painted the Mona Lisa?", options: ["a) Van Gogh", "b) Picasso", "c) Leonardo da Vinci", "d) Michelangelo"], correct: "c" },
    { question: "Which country has the largest population?", options: ["a) USA", "b) India", "c) China", "d) Russia"], correct: "c" },
    { question: "Which ocean is the largest?", options: ["a) Atlantic", "b) Indian", "c) Arctic", "d) Pacific"], correct: "d" }
];

// Step 3: Initialize variables for quiz tracking
let score = 0;
let currentQuestion = 0;
let totalTime = 100; // Total time for the quiz (100 seconds)
let questionTime = 10; // Time per question (10 seconds)

// Step 4: Create a readline interface to handle asynchronous user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Step 5: Function to ask a question and handle input asynchronously
function askQuestion() {
    if (currentQuestion >= quiz.length || totalTime <= 0) {
        endQuiz();
        return;
    }

    console.log(`\nQuestion ${currentQuestion + 1}: ${quiz[currentQuestion].question}`);
    quiz[currentQuestion].options.forEach(option => console.log(option));

    let timeRemaining = questionTime;
    let questionTimer = setInterval(() => {
        if (timeRemaining > 0) {
            process.stdout.write(`\rTime left for this question: ${timeRemaining}s`);
            timeRemaining--;
        } else {
            clearInterval(questionTimer);
            console.log(`\nTime's up! Moving to the next question.`);
            nextQuestion();
        }
    }, 1000);

    rl.question('\nYour answer: ', (answer) => {
        clearInterval(questionTimer); // Stop the timer when an answer is given
        if (timeRemaining > 0) {
            validateAnswer(answer);
        }
        nextQuestion();
    });
}

// Step 6: Validate the user's answer (case-insensitive)
function validateAnswer(answer) {
    const correctAnswer = quiz[currentQuestion].correct;
    if (answer.toLowerCase() === correctAnswer) {
        console.log('Correct!');
        score++;
    } else {
        console.log(`Wrong! The correct answer was ${correctAnswer}`);
    }
}

// Step 7: Move to the next question or end the quiz
function nextQuestion() {
    currentQuestion++;
    askQuestion();
}

// Step 8: End the quiz and show the final score
function endQuiz() {
    console.log('\n\nQuiz Over!');
    console.log(`Your final score is: ${score}/${quiz.length}`);
    rl.close();
}

// Step 9: Timer for the entire quiz (100 seconds)
let totalTimer = setInterval(() => {
    if (totalTime > 0) {
        process.stdout.write(`\rTime left for the entire quiz: ${totalTime}s`);
        totalTime--;
    } else {
        clearInterval(totalTimer);
        console.log(`\nTime's up for the quiz!`);
        endQuiz();
    }
}, 1000);

// Step 10: Start the quiz by asking the first question
askQuestion();
