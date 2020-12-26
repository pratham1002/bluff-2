/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function renderTurnButton (game) {
  const button = document.createElement('button')
  button.innerHTML = 'Pass'
  button.id = 'turnButton'

  button.addEventListener('click', () => {
    game.endTurn()
  })

  document.getElementById('my-cards').appendChild(button)
}
