//validate email and name for right format, else display a message

function validEmail (email) {
  const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email)
}

document.getElementById('quizForm').addEventListener('submit', function(event){
  event.preventDefault()

  //get input value from form and remove white space
  const email = document.getElementById('email').value.trim()
  const invalidEmailMessage = document.getElementById('invalidEmail')

  //call the check email function and add message if not valid
  if(!validEmail(email)){
    invalidEmailMessage.textContent = ''
    invalidEmailMessage.textContent = 'Please enter a valid email address!'
    document.getElementById('email').focus()
  }
})




