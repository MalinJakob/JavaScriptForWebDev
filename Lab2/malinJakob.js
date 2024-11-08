const quiz = {
  q1: {
    africanForestElephant: false,
    africanBushElephant: true,
    asianElephant: false
  },
  q2: {
    keenSenseOfSmell: true,
    formHerds: true,
    herbivores: true,
    useTrunks: true
  },
  q3: {
    min: 60,
    max: 70
  },
  q4: {
    climbingTrees: false,
    rollingInMud: true,
    diggingBurrows: false,
    divingUnderWater: false
  },
  q5: [
    ['poaching', 'ivory'], // Keywords for poaching for ivory
    ['habitat', 'loss'], // Keywords for habitat loss
    ['human', 'wildlife', 'conflict'] // Keywords for human-wildlife conflict
  ]
}

function checkAnswer (questionId, correctAnswers) {
  // Convert user's answer to lowercase
  const userAnswer = document.getElementById(questionId).value
  const answer = userAnswer.toLowerCase()

  // Check each set of keywords in correctAnswers
  for (let i = 0; i < correctAnswers.length; i++) {
    const keywords = correctAnswers[i]
    //goes through each option list
    // If all keywords in a option list are present in the answer, return true
    if (keywords.every(keyword => answer.includes(keyword))) {
      return true
    }
  }

  return false
}

// questionId must be same as the name of the input elements we are interested in
// correctAnswers must always be a object rather than a list
function isDictAnswerCorrect (questionId, answerOptions) {
  //get input elements for this question, both unchecked and checked
  const optionElements = document.querySelectorAll(`input[name=${questionId}]`)
  if (!optionElements) {
    return false
  }

  for (let i = 0; i < optionElements.length; i++) {
    const optionName = optionElements[i].value
    const selectedOption = optionElements[i].checked
    const correctAnswer = answerOptions[optionName]

    if (selectedOption !== correctAnswer) {
      return false
    }
  }
  return true
}

//questionId must be the id of the html input
//answer must be an object with two properties, min and max.
function isNumberIntervalAnswerCorrect (questionId, answer) {
  const inputElement = document.getElementById(questionId)
  const userInput = parseInt(inputElement.value)

  if (userInput >= answer.min && userInput <= answer.max) {
    return true
  }

  return false
}

//validate email and name for right format, else display a message
function validEmail (email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}

//check if the input for name is only letters
function validNames (name) {
  const namePattern = /^[A-Za-z]+$/
  return namePattern.test(name)
}

document
  .getElementById('quizForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    //get input values from form
    //remove white space from email input
    const email = document.getElementById('email').value.trim()
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const invalidFirstNameMessage = document.getElementById('invalidFirstName')
    const invalidLastNameMessage = document.getElementById('invalidLastName')
    const invalidEmailMessage = document.getElementById('invalidEmail')
    const inputValueQ2 = document.querySelectorAll(
      `input[name=characteristics]`
    )
    const inputValueQ3 = document.getElementById('lifeSpan')
    const inputValueQ5 = document.getElementById('endangered')
    const errorMessage = document.getElementById('errorMessage')

    invalidFirstNameMessage.textContent = ''
    invalidLastNameMessage.textContent = ''
    invalidEmailMessage.textContent = ''

    let error = false

    //check if fisrt/lastname only have letters and add message if not valid
    if (!validNames(firstName)) {
      invalidFirstNameMessage.textContent = 'Only letters are allowed'
      document.getElementById('firstName').focus()
      return
    }

    if (!validNames(lastName)) {
      invalidLastNameMessage.textContent = 'Only letters are allowed'
      document.getElementById('lastName').focus()
      return
    }

    //check if email is valid and add message if not valid
    if (!validEmail(email)) {
      invalidEmailMessage.textContent = 'Please enter a valid email address!'
      document.getElementById('email').focus()
      return
    }
    
    //go through option elements and check if they are boxed, if at least one is boxed, break
    let answerExist = false
    for (let i = 0; i < inputValueQ2.length; i++) {
      if (inputValueQ2[i].checked) {
        answerExist = true
        break
      }
    }
    
    //check if the user entered input in required questions
    if (!answerExist) {
      errorMessage.textContent = 'Please answer question 2'
      error = true
    } else if (!inputValueQ3.value) {
      errorMessage.textContent = 'Please answer question 3'
      error = true
    } else if (!inputValueQ5.value) {
      errorMessage.textContent = 'Please answer question 5'
      error = true
      //add required for question 2
    } else {
      errorMessage.textContent = 'WOOHOO you are done! Lets see how you did!!'
      messageBox.style.display = 'grid'
      messageBox.focus()
    }

    if (error) {
      messageBox.style.display = 'grid'
      messageBox.focus()
      return
    }

    //when submit is done the button for See Answers are shown to the user
    seeAnswerButton.style.display = 'grid'

    //if submission is done, the user can now click to se the answers
    seeAnswerButton.addEventListener('click', function () {
      if (correctAnswers) {
        correctAnswers.style.display = 'grid'
        messageBox.style.display = 'grid'
        messageBox.focus()
      }
    })

    const result = document.getElementById('totalScore')
    const isQ1Correct = isDictAnswerCorrect('largestEl', quiz.q1)
    const isQ2Correct = isDictAnswerCorrect('characteristics', quiz.q2)
    const isQ3Correct = isNumberIntervalAnswerCorrect('lifeSpan', quiz.q3)
    const isQ4Correct = isDictAnswerCorrect('coolingOff', quiz.q4)
    const isQ5Correct = checkAnswer('endangered', quiz.q5)

    //calculate the total correct answer and display to usr
    let totalScore = 0
    totalScore += isQ1Correct ? 1 : 0
    totalScore += isQ2Correct ? 1 : 0
    totalScore += isQ3Correct ? 1 : 0
    totalScore += isQ4Correct ? 1 : 0
    totalScore += isQ5Correct ? 1 : 0

    result.textContent = `Your total score is:  ${totalScore} / 5`
    messageBox.focus()
  })

const messageBox = document.querySelector('.backgroundMessage')
const correctAnswers = document.getElementById('correctAnswers')
const seeAnswerButton = document.getElementById('answerButton')
messageBox.setAttribute('tabindex', '-1')

//hide message box and correct answer when the content is fully loaded
window.addEventListener('DOMContentLoaded', function () {
  seeAnswerButton.style.display = 'none'
  correctAnswers.style.display = 'none'
  messageBox.style.display = 'none'
})
