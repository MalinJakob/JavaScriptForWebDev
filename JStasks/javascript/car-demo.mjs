// import teslaCar from 'elon-musks-library'
import fetch from 'fetch'
// function pullUpWindows () {
//   return new Promise(resolve => {
//     while (!teslaCar.windows.isClosed()) {
//       teslaCar.window1.pullUp() //detta sker ju inte DIREKT
//       teslaCar.window2.pullUp()
//       teslaCar.window3.pullUp()
//       teslaCar.window4.pullUp()
//     }
//     resolve()
//   })
// }

// function turnOfCar () {
//   pullUpWindows().then(() => {
//     shutDownElectronic()
//   })
// }


console.log(fetch('http://127.0.0.1:5500/JSForWebDev/JStasks/data/weekdays.json'))

