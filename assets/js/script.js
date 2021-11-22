const cards = document.querySelector(".cards")
const playerLiveCount = document.querySelector(".live_count")
let playerLives = 6
playerLiveCount.textContent = playerLives

const getData = () => [
    { image: "assets/images/avengers.jpg", name: "avengers" },
    { image: "assets/images/avengers.jpg", name: "avengers" },
    { image: "assets/images/baby.jpg", name: "baby" },
    { image: "assets/images/baby.jpg", name: "baby" },
    { image: "assets/images/ballon.jpg", name: "ballon" },
    { image: "assets/images/ballon.jpg", name: "ballon" },
    { image: "assets/images/ghost.jpg", name: "ghost" },
    { image: "assets/images/ghost.jpg", name: "ghost" },
    { image: "assets/images/minion.jpg", name: "minion" },
    { image: "assets/images/minion.jpg", name: "minion" },
    { image: "assets/images/penguin.jpg", name: "pinguin" },
    { image: "assets/images/penguin.jpg", name: "pinguin" },
    { image: "assets/images/pink_panther.jpg", name: "pink_panther" },
    { image: "assets/images/pink_panther.jpg", name: "pink_panther" },
    { image: "assets/images/up.jpg", name: "up" },
    { image: "assets/images/up.jpg", name: "up" }
]

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - .5)
    return cardData
}

// make the cards
const cardGenerator = () => {
    const cardData = randomize()
    cardData.forEach((item) => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("name", item.name)

        card.innerHTML = `
        <img class="face" src=${item.image} />
        <div class="back"></div>
        `
        cards.append(card)
        card.addEventListener("click", () => flipOver(card))
    })
}

const flipOver = (card) => {
    card.classList.toggle("toggleCard")
    card.classList.add("flipped")

    const cardFlipped = document.querySelectorAll(".flipped")


    if (cardFlipped.length === 2) {
        setTimeout(check, 500)
    }
    else if (cardFlipped.length === 3) {
        card.classList.toggle("toggleCard")
    }
}

// check the cards
const check = () => {
    const cardFlipped = document.querySelectorAll(".flipped")
    if (
        cardFlipped[0].getAttribute("name") ===
        cardFlipped[1].getAttribute("name")
    ) {
        cardFlipped.forEach(card => {
            card.classList.add("deactive")
            card.classList.remove("flipped")
        })
    }
    else {
        cardFlipped.forEach(card => card.classList.remove("toggleCard", "flipped"))
        playerLives--
        playerLiveCount.textContent = playerLives

        playerLives === 0 && restart("YOU LOSE")
    }
    const deactive = document.querySelectorAll(".deactive")
    deactive.length === 16 && restart("YOU WIN")
}

// Restart
const restart = text => {
    const cardData = randomize()
    const face = document.querySelectorAll(".face")
    const cardEl = document.querySelectorAll(".card")
    cardData.forEach((card, index) => {
        setTimeout(() => {
            face[index].src = card.image
            cardEl[index].setAttribute("name", card.name)
            face[index].parentNode.classList.remove("deactive", "toggleCard")
        }, 1000)
    })
    playerLives = 6
    playerLiveCount.textContent = playerLives
    window.alert(text)
}

window.addEventListener("load", cardGenerator)