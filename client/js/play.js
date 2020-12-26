/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io()

class Game {
  constructor () {
    this._name = ''
    this._room = ''
    this._cards = []
    this._selectedCards = []
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

  start () {
    // delete the form
    document.getElementById('registration').parentElement.removeChild(document.getElementById('registration'))

    const $myCardsDiv = document.createElement('div')
    $myCardsDiv.id = 'my-cards'
    document.getElementById('root').appendChild($myCardsDiv)

    renderCards(this)
    renderCheckButton(this)
    renderTurnButton(this)
  }

  callBluff () {
    // handle bluff button clicks here
  }

  endTurn () {
    // handle sending of cards and passes here
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  register(game)

  socket.on('start', (deck) => {
    game.cards = deck
    console.log(game)
    game.start()
  })
})
