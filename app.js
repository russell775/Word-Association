const scoreDisplay = document.getElementById('score-display')
const questionDisplay = document.getElementById('question-display')

//We have a questions array with the objects of questions
const questions = [
  {
    correct: 2,
    option: ['jury', 'assess'],
    quiz: ['value', 'estimate', 'evaluate'],
  },
  {
    correct: 2,
    option: ['trace', 'adjacent'],
    quiz: ['close', 'near', 'next'],
  },
  {
    correct: 2,
    option: ['mad', 'exotic'],
    quiz: ['foreign', 'national', 'ethnic'],
  },
  {
    correct: 1,
    option: ['forecast', 'sustainable'],
    quiz: ['assume', 'insight', 'weather'],
  },
  {
    correct: 2,
    option: ['charity', 'rapid'],
    quiz: ['fast', 'quick', 'prompt'],
  },
]

//We declare in here our global variables
let clicked = []
let score = 0

//Our default score is 0
scoreDisplay.textContent = score

//Function for automatically create the question boxes
function populateQuestions() {
  //We are looping through the questions array and creating new element
  questions.forEach((question) => {
    const questionBox = document.createElement('div')
    questionBox.classList.add('question-box')

    //We are creating new logo
    const logoDisplay = document.createElement('h1')
    logoDisplay.textContent = '✒'
    questionBox.append(logoDisplay)

    //We are creating new tip text element with the value of inside of quiz attribute array
    question.quiz.forEach((tip) => {
      const tipText = document.createElement('p')
      tipText.textContent = tip
      questionBox.append(tipText)
    })

    // We are creating the question buttons element
    const questionButtons = document.createElement('div')
    questionButtons.classList.add('question-buttons')
    questionBox.append(questionButtons)

    //We are creating actual buttons through looping over the option array property
    question.option.forEach((option, optionIndex) => {
      const questionButton = document.createElement('button')
      questionButton.classList.add('question-button')
      questionButton.textContent = option
      //We are putting click event listener to check the answer, we are passing a callback function called checkAnswer() with those 5 parameters
      questionButton.addEventListener('click', () =>
        checkAnswer(
          questionBox,
          questionButton,
          option,
          optionIndex + 1,
          question.correct
        )
      )
      questionButtons.append(questionButton)
    })
    //Create the element for the our answer and inject it to the our question box
    const answerDisplay = document.createElement('div')
    answerDisplay.classList.add('answer-display')

    questionBox.append(answerDisplay)
    questionDisplay.append(questionBox)
  })
}

//Call the function to populate our questions
populateQuestions()

//Function for the check if our answer is correct or not
function checkAnswer(
  questionBox,
  questionButton,
  option,
  optionIndex,
  correctAnswer
) {
  //If user's option is correct increase the score and print the 'Correct' to the question box element
  if (optionIndex === correctAnswer) {
    score++
    scoreDisplay.textContent = score
    addResult(questionBox, 'Correct!', 'correct')
  } else {
  //If user's option is incorrect decrease the score and print the 'Wrong' to the question box element
    score--
    scoreDisplay.textContent = score
    addResult(questionBox, 'Wrong!', 'wrong')
  }
  //We are storing to the array
  clicked.push(option)
  //Disable the question box which is already clicked
  questionButton.disabled = clicked.includes(option)
}

//This function for the remove and add the elements for the result of user's answer
function addResult(questionBox, answer, className) {
  const answerDisplay = questionBox.querySelector('.answer-display')
  answerDisplay.classList.remove('wrong')
  answerDisplay.classList.remove('correct')
  answerDisplay.classList.add(className)
  answerDisplay.textContent = answer
}
