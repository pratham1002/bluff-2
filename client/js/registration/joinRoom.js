/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function joinRoom (game) {
  const $registrationForm = document.getElementById('registrationForm')

  $registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.getElementById('formSubmit').setAttribute('disabled', 'disabled')
    const $username = document.getElementById('username')
    const $room = document.getElementById('room')
    game.name = $username.value
    game.room = $room.value

    await socket.emit('join', game.name, game.room, (error) => {
      if (error) {
        alert(error)
      } else {
        document.getElementById('formSubmit').parentElement.removeChild(document.getElementById('formSubmit'))
        createStartButton()
        const $startButton = document.getElementById('startButton')
        $startButton.addEventListener('click', async (e) => {
          e.preventDefault()
          await socket.emit('start', game.name)
        })
      }
    })
  })

  socket.on('start', (deck) => {
    game.cards = deck
    console.log(game)

    // delete the form
    document.getElementById('registration').parentElement.removeChild(document.getElementById('registration'))
    renderCards(game)
    renderCheckButton(game)
    renderTurnButton(game)
  })
}
