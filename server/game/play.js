const { io } = require('../app')

const {
  getGame,
  addUser,
  removeUser,
  getUser
} = require('./users')

io.on('connection', (socket) => {
  console.log('Connection established!')

  // a new player enters the game room
  socket.on('join', (username, room, callback) => {
    try {
      console.log(username, ' joining ', room)
      const { error, user } = addUser({ id: socket.id, username: username, room: room })

      if (error) {
        return callback(error)
      }

      console.log('users in the room :' + getGame(user.room).players)

      socket.join(user.room)
    } catch (e) {
      console.log(e)
    }
  })

  // the game is started
  // return cards to all players
  socket.on('start', (username) => {
    const user = getUser(username)
    const game = getGame(user.room)
    const deck = game.start()
    io.to(user.room).emit('start', deck)
  })

  socket.on('move', (username, initial, final) => {
    const user = getUser(username)
    // console.log(user.room)
    socket.to(user.room).emit('opponentMoved', initial, final)
    // callback();
  })

  socket.on('convert', (username, piece, choices, final, finalRow, finalCol) => {
    const user = getUser(username)
    // console.log(user.room)
    socket.to(user.room).emit('opponentConverted', piece, choices, final, finalRow, finalCol)
    // callback();
  })

  socket.on('end', (player) => {
    // winner recieved from client side, run database changes here
  })

  socket.on('disconnect', () => {
    removeUser(socket.id)
  })
})
