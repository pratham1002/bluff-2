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
      console.log('users in the room :' + getGame(user.room).players)

      socket.join(user.room)

      io.sockets.in(user.room).emit('update-player-list', getGame(user.room).playerList)
      callback()
    } catch (e) {
      console.log(e)
      callback(e.message)
    }
  })

  // the game is started
  // send cards to all players
  socket.on('start', (username) => {
    console.log('starting game')
    const user = getUser(username)
    const game = getGame(user.room)
    game.start()

    game.players.forEach(player => io.to(player.id).emit('start', game.sendCards()))
  })

  socket.on('disconnect', () => {
    console.log(users)
    removeUser(socket.id)
    console.log(users)
  })
})
