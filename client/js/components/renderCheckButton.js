/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function renderCheckButton (game) {
  const button = document.createElement('button')
  button.innerHTML = 'Call Bluff'
  button.id = 'checkButton'

  button.addEventListener('click', () => {
    game.callBluff()
  })

  document.getElementById('my-cards').appendChild(button)
}
