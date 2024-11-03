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
  q5: ['Poaching for ivory', 'habitat loss', 'human-wildlife conflict']
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
  })
