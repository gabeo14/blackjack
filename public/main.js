//sets dealer hand to an empty array
let dealerHand = []

//sets player hand to an empty array
let playerHand = []

//sets deck to an empty array
let deck = []

//where the player score is displayed
let showPlayer = document.querySelector(".player-score")

//where the dealer score is diplayed
let showDealer = document.querySelector(".dealer-score")

// where message for game status is diplayed
let displayStatus = document.querySelector(".winlose")

//sets up the variables for the scores
let playerCount = 0
let dealerCount = 0

//count players score and ends turn after 5 cards
let countPlayer = () => {
  if (playerHand.length === 2) {
    playerCount = playerHand[0].value + playerHand[1].value
    showPlayer.textContent = playerCount
  }
  if (playerHand.length === 3) {
    playerCount =
      playerHand[0].value + playerHand[1].value + playerHand[2].value
    showPlayer.textContent = playerCount
  }
  if (playerHand.length === 4) {
    playerCount =
      playerHand[0].value +
      playerHand[1].value +
      playerHand[2].value +
      playerHand[3].value
    showPlayer.textContent = playerCount
  }
  if (playerHand.length === 5) {
    playerCount =
      playerHand[0].value +
      playerHand[1].value +
      playerHand[2].value +
      playerHand[3].value +
      playerHand[4].value
    showPlayer.textContent = playerCount
    noMore()
  }
}

// counts dealers score and ends game after 5 cards
let countDealer = () => {
  if (dealerHand.length === 2) {
    dealerCount = dealerHand[0].value + dealerHand[1].value
    showDealer.textContent = dealerCount
  }
  if (dealerHand.length === 3) {
    dealerCount =
      dealerHand[0].value + dealerHand[1].value + dealerHand[2].value
    showDealer.textContent = dealerCount
  }
  if (dealerHand.length === 4) {
    dealerCount =
      dealerHand[0].value +
      dealerHand[1].value +
      dealerHand[2].value +
      dealerHand[3].value
    showDealer.textContent = dealerCount
  }
  if (dealerHand.length === 5) {
    dealerCount =
      dealerHand[0].value +
      dealerHand[1].value +
      dealerHand[2].value +
      dealerHand[3].value +
      dealerHand[4].value
    showDealer.textContent = dealerCount
    checkWinner()
  }
}

// determines who won
const checkWinner = () => {
  console.log("check winner")
  if (dealerCount > playerCount) {
    displayStatus.textContent =
      "DEALER HAS " + `${showDealer.textContent}` + ", YOU LOSE."
  }
  if (dealerCount < playerCount) {
    displayStatus.textContent =
      "YOU HAVE " + `${showPlayer.textContent}` + ", YOU WIN!"
  }
  if (dealerCount === playerCount) {
    displayStatus.textContent =
      "YOU BOTH HAVE" + `${showPlayer.textContent}` + ", THE DEALER WINS."
  }
}

// arguments for the stay button and ends game if dealer busts
const noMore = () => {
  console.log("stay")
  // hides the stay and hit button and back of card image in dealers hand.
  document.querySelector(".hits").classList.add("hideme")
  document.querySelector(".stays").classList.add("hideme")
  document.querySelector(".back").classList.add("hideme")
  dealCardToDealer()
  countDealer()
  if (dealerCount < 17) {
    noMore()
  }
  if (dealerCount >= 17 && dealerCount <= 21) {
    checkWinner()
  }
  if (dealerCount > 21) {
    displayStatus.textContent =
      "DEALER BUSTED WITH " + `${showDealer.textContent}` + ", YOU WIN!"
  }
}

// argument for the hit button and ends game if player busts
const giveMore = () => {
  console.log("hit")
  dealCardToPlayer()
  countPlayer()
  if (playerCount <= 21) {
    displayStatus.textContent =
      "YOU HAVE " + `${showPlayer.textContent}` + ", HIT OR STAY"
  }
  if (playerCount > 21) {
    document.querySelector(".hits").classList.add("hideme")
    document.querySelector(".stays").classList.add("hideme")
    displayStatus.textContent = "YOU BUSTED, PLAY AGAIN"
  }
}

const dealCardToPlayer = upOrDown => {
  countPlayer()
  // Take one card from the deck
  let card = deck.pop()

  // Place that card in the dealer's hand
  playerHand.push(card)

  // Go find my dealer-hand div
  const playerHandDiv = document.querySelector(".player-hand")

  // Make a new image tag in memory
  let image = document.createElement("img")

  // Tell that image tag where it's image is. We do this dynamically
  // based on the face and the suit
  image.src = `/images/${card.face}${card.suit}.jpg`
  // Push that image tag into the DIV as a child
  playerHandDiv.appendChild(image)
}

const dealCardToDealer = upOrDown => {
  // Take one card from the deck
  let card = deck.pop()

  // Place that card in the dealer's hand
  dealerHand.push(card)

  // Go find my dealer-hand div
  const dealerHandDiv = document.querySelector(".dealer-hand")

  // Make a new image tag in memory
  let image = document.createElement("img")

  // Tell that image tag where it's image is. We do this dynamically
  // based on the face and the suit
  image.src = `/images/${card.face}${card.suit}.jpg`

  // Push that image tag into the DIV as a child
  dealerHandDiv.appendChild(image)
}

const main = () => {
  let suits = ["C", "S", "D", "H"]
  let cards = [
    { value: 2, face: "2" },
    { value: 3, face: "3" },
    { value: 4, face: "4" },
    { value: 5, face: "5" },
    { value: 6, face: "6" },
    { value: 7, face: "7" },
    { value: 8, face: "8" },
    { value: 9, face: "9" },
    { value: 10, face: "10" },
    { value: 10, face: "J" },
    { value: 10, face: "Q" },
    { value: 10, face: "K" },
    { value: 11, face: "A" }
  ]

  // loop through all the suits
  suits.forEach(suit => {
    // Do this for each suit

    // For this suit go through the cards
    cards.forEach(card => {
      // make a new card to put in the deck
      let newCardForTheDeck = {
        suit: suit,
        value: card.value,
        face: card.face
      }

      // add it to the deck
      deck.push(newCardForTheDeck)
    })
  })

  // Shuffle the deck into a random order
  //
  // Uses [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)
  for (let i = 52 - 1; i > 1; i -= 1) {
    let j = Math.floor(Math.random() * i)
    let firstCard = deck[i]
    let secondCard = deck[j]
    deck[i] = secondCard
    deck[j] = firstCard
  }
  dealCardToPlayer("up")
  dealCardToPlayer("up")
  dealCardToDealer("up")
  //dealCardToDealer('down')
  countPlayer()
  // makes the dealer score a ? at the begining
  showDealer.textContent = "?"
  // message for begining of game
  displayStatus.textContent =
    "YOU HAVE " + `${showPlayer.textContent}` + ", HIT OR STAY"
  // all the event listener for the buttons
  document.querySelector(".hits").addEventListener("click", giveMore)
  document.querySelector(".stays").addEventListener("click", noMore)
  document.querySelector(".reset").addEventListener("click", () => {
    document.location = "/"
  })
}

document.addEventListener("DOMContentLoaded", main)
