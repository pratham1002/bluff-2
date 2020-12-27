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

  get turn () {
    return this._turn
  }

  get state () {
    if (!this._hasStarted) {
      const playerList = []

      this._players.forEach(player => playerList.push({ name: player.name }))

      return { playerList: playerList }
    } else {
      const playerList = []
      const records = []

      this._players.forEach((player) => playerList.push({
        name: player.name,
        numberOfCards: player.cards.length
      }))

      this._currentRound.forEach((record) => {
        if (record.cards === 'Pass') {
          records.push(record.player.name + ' passed.')
        } else {
          records.push(record.player.name + ' added ' + record.cards.length + ' cards.')
        }
      })

      return {
        playerList: playerList,
        totalCentralStackSize: this._centralStack.length,
        lastTurnSize: this._lastTurn.length,
        currentRank: this._currentRank,
        currentRound: records,
        turn: this._players[this._turn].name
      }
    }
  }

  nextRound () {
    this._turn = (this._turn + 1) % this._players.length
  }

  winner () {
    // TODO: check for win condition: a player has zero cards and it is not his turn
  }

  /**
   * add the cards to the central stack
   * @param {Player} player
   * @param {Array<Card>} cards
   */
  addToCentralStack (player, cards) {
    this._centralStack = this._centralStack.concat(cards)
    this._lastTurn = [...cards]

    for (let i = 0; i < cards.length; i++) {
      player.cards = player.cards.filter(card => !(card.suit.name === cards[i].suit.name && card.rank.shortName === cards[i].rank.shortName))
    }
  }

  /**
   * Add entry to the current round record
   * @param {Player} player
   * @param {Array<Card>} cards
   */
  addToRecord (player, cards) {
    if (!cards) {
      this._currentRound.push({ player: player, cards: 'Pass' })
    } else {
      this._currentRound.push({ player: player, cards: [...cards] })
    }
  }

  /**
   * add player to the game
   * @param {Player} p player to be added
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
    @param: {Player} player to be removed
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

    this._players.forEach(player => this._allocateCards())
  }

  _allocateCards () {
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
      deck.merge(new decks.StandardDeck({ jokers: 2 }))
    }

    // for more than 10 players, add another deck
    if (this._players.length > 10) {
      deck.merge(new decks.StandardDeck({ jokers: 2 }))
    }

    return deck
  }
}

module.exports = Game
