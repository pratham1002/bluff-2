/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io()

class Game {
  constructor () {
    this._name = ''
    this._room = ''
    this._cards = ''
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

  set name (name) {
    this._name = name
  }

  set room (room) {
    this._room = room
  }

  set cards (cards) {
    this._cards = cards
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  createRegistrationForm()
  joinRoom(game)
})
