/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function register (game) {
  const form = document.getElementById('registration-form')

  form.addEventListener('submit', async (e) => {
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
        createStartButton(game)
      }
    })
  })
}
