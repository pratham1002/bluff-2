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
      const game = getGame(user.room)
      socket.join(user.room)

      console.log('number of players in the room :' + game.players.length)

      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
      callback()
    } catch (e) {
      console.log(e)
      callback(e.message)
    }
  })

  // the game has started: send cards to all players
  socket.on('start', () => {
    const user = getUser(socket.id)
    const game = getGame(user.room)

    game.start()

    game.players.forEach(player => io.to(player.id).emit('start'))
    game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
  })

  socket.on('call-bluff', () => {
    // TODO: handle a bluff check
    const user = getUser(socket.id)
    const game = getGame(user.room)
    game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
  })

  socket.on('pass', () => {
    // TODO: handle pass
    const user = getUser(socket.id)
    const game = getGame(user.room)
    game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
  })

  socket.on('turn', (cards) => {
    // TODO: handle cards sent by a player
    const user = getUser(socket.id)
    const game = getGame(user.room)
    game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
  })

  socket.on('disconnect', () => {
    console.log(users)
    removeUser(socket.id)
    console.log(users)
  })
})
