/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function createRegistrationForm (game) {
  const $registration = document.getElementById('registration')

  const form = document.createElement('form')
  form.setAttribute('id', 'registrationForm')

  const usernamePara = document.createElement('p')
  usernamePara.innerHTML = 'username : '
  form.appendChild(usernamePara)

  const username = document.createElement('input')
  username.setAttribute('id', 'username')
  username.setAttribute('placeholder', 'Enter username')
  username.setAttribute('name', 'username')
  username.setAttribute('type', 'text')
  username.setAttribute('required', 'true')
  form.appendChild(username)

  const roomPara = document.createElement('p')
  roomPara.innerHTML = 'room name : '
  form.appendChild(roomPara)

  const room = document.createElement('input')
  room.setAttribute('id', 'room')
  room.setAttribute('placeholder', 'Enter room name')
  room.setAttribute('name', 'room')
  room.setAttribute('type', 'text')
  room.setAttribute('required', 'true')
  form.appendChild(room)

  const submit = document.createElement('button')
  submit.setAttribute('id', 'formSubmit')
  submit.setAttribute('type', 'submit')
  submit.innerHTML = 'Play!'
  form.appendChild(submit)

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

  $registration.appendChild(form)
}
