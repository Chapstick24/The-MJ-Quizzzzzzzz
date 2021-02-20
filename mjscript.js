const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

var questions = [
    {
        question: "What famous MJ played for the Chicago Bulls?",
        choice1: "Magic Johnson",
        choice2: "Michael Jordon",
        choice3: "Michael Jackson",
        choice4: "Matthew Jones",
        answer: 2,

    },
    {
        question: "In 1986 this famous MJ average 24 points and 12 assists for the LA Lakers",
        choice1: "Magic Johnson",
        choice2: "Mike Jones",
        choice3: "Mark Jose",
        choice4: "Mimi Joose",
        answer: 1,

    },
    {
        question: "This MJ was also known as the King of pop",
        choice1: "Mike Jones",
        choice2: "Prince",
        choice3: "Michael Jackson",
        choice4: "Marky Marky",
        answer: 3,
    },
    {
        question: " This MJ rapped the lyrics 281 330 8004",
        choice1: "Mike Jones",
        choice2: "Matthew jones",
        choice3: "Mark Jones",
        choice4: "Mitch Jones",
        answer: 1,

    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./endOfQuiz.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()