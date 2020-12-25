const { io } = require('../app')

const {
  getGame,
  addUser,
  removeUser,
  getUser,
  users
} = require('./users')

io.on('connection', (socket) => {
  console.log('Connection established!')

  // a new player enters the game room
  socket.on('join', (username, room, callback) => {
    try {
      console.log(username, ' joining ', room)

      const user = addUser(socket.id, username, room)
      console.log(user.room)
      console.log('users in the room :' + getGame(user.room).players)

      socket.join(user.room)
      callback()
    } catch (e) {
      console.log(e)
    }
  })

  // the game is started
  // send cards to all players
  socket.on('start', (username) => {
    console.log('starting game')
    const user = getUser(username)
    const game = getGame(user.room)
    const deck = game.start()

    game.players.forEach(player => io.to(user.id).emit('start', deck.draw(5)))
  })

  socket.on('disconnect', () => {
    console.log(users)
    removeUser(socket.id)
    console.log(users)
  })
})
