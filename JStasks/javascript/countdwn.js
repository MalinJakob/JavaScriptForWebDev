function countDown(number) {
  if(number === 0) {
    return
  }
  console.log(number)
  setTimeout(() => {
    countDown(number - 1)
  }, 1000)
}

countDown(10)




function setTimeout(whenTimeElapsed, howMuchTimeShouldElapse) {
  //sleep(howMuchTimeShouldElapse)
  //whenTimeElapsed()
}