const { decks } = require('cards')

class Game {
  constructor (name) {
    this._name = name
    this._players = []
    this._hasStarted = false
    this._deck = null
    this._sendCardsIndex = 0
    this._centralStack = []
    this._lastTurn = []
    this._currentRank = undefined
    this._currentRound = []
    this._turn = undefined
  }

  get name () {
    return this._name
  }

  get players () {
    return this._players
  }

  get deck () {
    return this._deck
  }

  get state () {
    if (!this._hasStarted) {
      const playerList = []

      this._players.forEach(player => playerList.push({ name: player.name }))

      return { playerList: playerList }
    } else {
      const playerList = []

      this._players.forEach((player) => playerList.push({
        name: player.name,
        numberOfCards: player.cards.length
      }))

      return {
        playerList: playerList,
        totalCentralStackSize: this._centralStack.length,
        lastTurnSize: this._lastTurn.length,
        currentRank: this._currentRank,
        currentRound: this._currentRound,
        turn: this._turn
      }
    }
  }

  /**
    @param: {player} player to be added
  */
  addPlayer (p) {
    // check for max number of players
    if (this._players.length === 12) {
      throw new Error('Room full')
    }
    // check if game has already started
    if (this._hasStarted) {
      throw new Error('Game already started')
    }
    // Check for existing user
    if (this._players.find(player => player.name === p.name)) {
      throw new Error('Username already in use.')
    }

    this._players.push(p)
  }

  /**
    @param: {player} player to be removed
  */
  removePlayer (p) {
    this._players = this._players.filter(player => player.id !== p.id)
  }

  start () {
    if (this._hasStarted) {
      throw new Error('Game already started')
    }

    this._hasStarted = true
    this._sendCardsIndex = 1
    this._turn = 0

    const deck = this._getDeck()
    deck.shuffleAll()

    this._deck = deck

    this._players.forEach(player => this.allocateCards())
  }

  allocateCards () {
    const numberOfPlayers = this._players.length
    const deckSize = this._deck.totalLength
    const numberOfCardsPerPlayer = Math.floor(deckSize / numberOfPlayers)

    const hand = this._deck.draw(numberOfCardsPerPlayer)

    if (this._sendCardsIndex <= deckSize % numberOfPlayers) {
      hand.push(this._deck.draw()[0])
    }
    this._players[this._sendCardsIndex - 1].cards = hand
    this._sendCardsIndex++

    return hand
  }

  _getDeck () {
    // Create a standard 52 card deck + 2 jokers
    const deck = new decks.StandardDeck({ jokers: 2 })

    // for more than 5 players add a deck
    if (this._players.length > 5) {
      const deck2 = new decks.StandardDeck({ jokers: 2 })
      for (let i = 1; i <= 54; i++) {
        deck.add(deck2.draw()[0])
      }
    }

    // for more than 10 players, add another deck
    if (this._players.length > 10) {
      const extraDeck = new decks.StandardDeck({ jokers: 2 })
      for (let i = 1; i <= 54; i++) {
        deck.add(extraDeck.draw()[0])
      }
    }

    console.log(deck.remainingLength, deck.totalLength)

    return deck
  }
}

module.exports = Game
