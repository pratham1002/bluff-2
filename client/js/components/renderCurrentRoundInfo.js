/* eslint-disable no-unused-vars */
function renderCurrentRoundInfo (centralStackSize, centralStackLast, rank, history, turn) {
  let $roundInfo = document.getElementById('round-info')

  if (!$roundInfo) {
    $roundInfo = document.createElement('div')
    $roundInfo.id = 'round-info'

    document.getElementById('root').appendChild($roundInfo)
  }

  $roundInfo.innerHTML = ''

  $roundInfo.innerHTML = centralStackSize + ' (' + centralStackLast + ')' + ' ' + rank + ' turn:' + turn

  history.forEach((event) => {
    const $eventDiv = document.createElement('div')
    $eventDiv.innerHTML = event
    $roundInfo.appendChild($eventDiv)
  })
}
