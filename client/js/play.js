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

  callBluff () {
    // handle bluff button clicks here
  }

  endTurn () {
    // handle sending of cards and passes here
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  createRegistrationForm()
  joinRoom(game)
})
