/* eslint-disable no-undef */
console.log(1)
const socket = io()

socket.emit('join', 'pratham', 'abc', () => {
  socket.emit('start', 'pratham')
})

socket.on('start', (deck) => {
  console.log(deck)
})
