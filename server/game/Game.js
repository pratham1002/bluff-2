const { decks } = require('cards')

class Game {
  constructor (name) {
    this._name = name
    this._players = []
  }

  get name () {
    return this._name
  }

  get players () {
    return this._players
  }

  /**
    @param: {player} player to be added
  */
  addPlayer (p) {
    this._players.push(p)
  }

  /**
    @param: {player} player to be removed
  */
  removePlayer (p) {
    this._players = this._players.filter(player => player !== p)
  }

  start () {
    // Create a standard 52 card deck + 2 jokers
    const deck = new decks.StandardDeck({ jokers: 2 })

    // Shuffle the deck
    deck.shuffleAll()

    return deck
  }
}

module.exports = Game
