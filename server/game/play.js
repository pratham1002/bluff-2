/* eslint-disable node/no-callback-literal */
const { io } = require('../app')

const {
  getGame,
  addUser,
  removeUser,
  getUser
  // users
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

  socket.on('pass', (callback) => {
    try {
      const user = getUser(socket.id)
      const game = getGame(user.room)

      // update game
      game.pass(user)

      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
      callback()
    } catch (e) {
      callback(e.message)
    }
  })

  socket.on('turn', (cards, rank, callback) => {
    try {
      const user = getUser(socket.id)
      const game = getGame(user.room)

      // update game
      game.playCards(user, cards, rank)

      // if (game.winner()) {
      //   return io.sockets.in(user.room).emit('win', game.winner())
      // }

      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
      callback()
    } catch (e) {
      callback(e.message)
    }
  })

  socket.on('disconnect', () => {
    try {
      const user = getUser(socket.id)
      const game = getGame(user.room)
      removeUser(socket.id)
      game.players.forEach(player => io.to(player.id).emit('update-game-state', game.state, player.cards))
    } catch (e) {
      console.log(e.message)
    }
  })
})
