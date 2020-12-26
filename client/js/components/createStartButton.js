/* eslint-disable no-unused-vars */

function createStartButton () {
  const $registration = document.getElementById('registration')

  const button = document.createElement('button')
  button.setAttribute('id', 'startButton')
  button.innerHTML = 'Start'

  $registration.appendChild(button)
}
