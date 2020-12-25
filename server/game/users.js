const Player = require('./Player')
const Game = require('./Game')

const games = []
const users = []

/**
 * @param {string} name
 * @return {Game} game
 */
const getGame = (name) => {
  return games.find(game => game.name === name)
}

/**
 * @param {string} id
 * @param {string} username
 * @param {string} room
 */
const addUser = (id, username, room) => {
  try {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
      throw new Error('Username and Room name are required')
    }

    let game = getGame(room)

    // create a new game for a new room
    if (!game) {
      game = new Game(room)
      games.push(game)
    }

    // Check for existing user
    if (game.players.includes(user => user.name === username)) {
      throw new Error('Username is already in use')
    }

    // Store user
    const user = new Player(id, username, room)
    game.addPlayer(user)
    users.push(user)

    return user
  } catch (e) {
    console.log(e)
  }
}

/**
 * @param {string} id
 */
const removeUser = (id) => {
  // find the user by id
  const user = users.find(u => u.id === id)

  // remove users from list of users
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }

  // remove user from game
  const game = getGame(user.room)
  game.removePlayer(user)
}

/**
  @param: {string} username
  @return: {player} player
 */
const getUser = (username) => {
  username = username.trim().toLowerCase()
  const user = users.find((user) => user.name === username)

  return user
}

module.exports = {
  getGame,
  addUser,
  removeUser,
  getUser
}
