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
    // If all keywords in a set are present in the answer, return true
    if (keywords.every(keyword => answer.includes(keyword))) {
      return true
    }
  }

  return false
}

// questionId must be same as the name of the input elements we are interested in
// correctAnswers must always be a object rather than a list
function isDictAnswerCorrect (questionId, correctAnswers) {
  //get input elements for this question, both unchecked and checked
  const userAnswers = document.querySelectorAll(`input[name=${questionId}]`)
  if (!userAnswers) {
    return false
  }

  for (let i = 0; i < userAnswers.length; i++) {
    const userValue = userAnswers[i].value
    const isChecked = userAnswers[i].checked
    if (correctAnswers[userValue] !== isChecked) {
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

document
  .getElementById('quizForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    //get input value from form and remove white space
    const email = document.getElementById('email').value.trim()
    const invalidEmailMessage = document.getElementById('invalidEmail')

    //call the check email function and add message if not valid
    if (validEmail(email)) {
      invalidEmailMessage.textContent = ''
    } else {
      invalidEmailMessage.textContent = 'Please enter a valid email address!'
      document.getElementById('email').focus()
    }

    const isQ1Correct = isDictAnswerCorrect('largestEl', quiz.q1)
    const isQ2Correct = isDictAnswerCorrect('characteristics', quiz.q2)
    const isQ3Correct = isNumberIntervalAnswerCorrect('lifeSpan', quiz.q3)
    const isQ4Correct = isDictAnswerCorrect('coolingOff', quiz.q4)
    const isQ5Correct = checkAnswer('endangered', quiz.q5)

    console.log(isQ1Correct, isQ2Correct, isQ3Correct, isQ4Correct, isQ5Correct)
  })
