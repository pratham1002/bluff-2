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
    console.log(this._players, p)
    this._players = this._players.filter(player => player.id !== p.id)
  }

  start () {
    // Create a standard 52 card deck + 2 jokers
    const deck = new decks.StandardDeck({ jokers: 2 })

    // for more than 5 players add a deck
    if (this._players > 5) {
      const deck2 = new decks.StandardDeck({ jokers: 2 })
      for (let i = 1; i <= 54; i++) {
        deck.add(deck2.draw())
      }
    }

    // for more than 10 players, add another deck
    if (this._players > 10) {
      const extraDeck = new decks.StandardDeck({ jokers: 2 })
      for (let i = 1; i <= 54; i++) {
        deck.add(extraDeck.draw())
      }
    }

    // Shuffle the deck
    deck.shuffleAll()

    console.log(deck.remainingLength)

    return deck
  }
}

module.exports = Game
