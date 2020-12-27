/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class Game {
  constructor () {
    this._name = ''
    this._room = ''
    this._cards = []
    this._selectedCards = []
    this._hasStarted = false
    this._state = undefined
  }

  get name () {
    return this._name
  }

  get room () {
    return this._room
  }

  get cards () {
    return this._cards
  }

  get selectedCards () {
    return this._selectedCards
  }

  get state () {
    return this._state
  }

  set name (name) {
    this._name = name
  }

  set room (room) {
    this._room = room
  }

  set cards (cards) {
    this._cards = cards
  }

  set selectedCards (selectedCards) {
    this._selectedCards = selectedCards
  }

  set state (state) {
    this._state = state

    console.log('Game state reload', this)

    // render the new state
    if (!this._hasStarted) {
      // render only the player names
      const players = []

      state.playerList.forEach(player => players.push(player.name))

      renderPlayerList(this._room, this._name, players)
    } else {
      document.getElementById('my-cards').innerHTML = ''

      // render the cards box
      renderCards(this)
      renderCheckButton(this)
      renderTurnButton(this)

      // render player names with number of cards
      const players = []

      state.playerList.forEach(player => players.push(player.name + ' - ' + player.numberOfCards))

      renderPlayerList(this._room, this._name, players)
      // render central stack information
      // renderCentralStack(state.totalCentralStackSize, state.lastTurnSize)
      // render the current player turn and current rank
      // renderCurrentRoundInfo(state.currentRank, state.currentRound, state.turn)
    }
  }

  start () {
    this._hasStarted = true
    // delete the form
    document.getElementById('registration').remove()

    const $myCardsDiv = document.createElement('div')
    $myCardsDiv.id = 'my-cards'
    document.getElementById('root').appendChild($myCardsDiv)
  }

  callBluff () {
    // handle bluff button clicks here
    socket.emit('call-bluff')
  }

  endTurn () {
    // handle sending of cards and passes here
    if (this._selectedCards.length === 0) {
      socket.emit('pass')
    } else {
      const cards = this._cards.filter(card => this.selectedCards.includes(card.id))

      cards.map(card => {
        delete card.id
        return card
      })

      socket.emit('turn', cards)
    }
  }
}
