class Player {
    constructor(id) {
      this.id = id
      this.score = 0
      this.isPlaying = false
    }
  
    increaseScore(points) {
      this.score += points
    }
  
    resetScore() {
      this.score = 0
    }
  
    getScore() {
      return this.score
    }
  }
  
  class Game {
    constructor(players) {
      this.players = players
      this.currentPlayerIndex = 0
      this.gameStarted = false
      this.diceImage = document.querySelector(".dice")
    }
  
    startGame() {
      this.gameStarted = true
      this.players.forEach((player) => player.resetScore())
      this.updateScoreboard()
      this.players[0].isPlaying = true
    }
  
    rollDice() {
      if (!this.gameStarted) {
        alert("First you need to start the game! )")
        return
      }
  
      const diceRollNumber = this.generateDiceNumber()
      console.log(`Dice out ${diceRollNumber}`)
  
      // Display dice image
      this.diceImage.setAttribute("src", `img/dice-${diceRollNumber}.png`)
  
      // Add the score to the current player
      if (diceRollNumber > 1) {
        const currentPlayer = this.getCurrentPlayer()
        currentPlayer.increaseScore(diceRollNumber)
        this.updateScoreboard(currentPlayer, diceRollNumber)
      } else this.changePlayer()
    }
  
    getCurrentPlayer() {
      return this.players[this.currentPlayerIndex]
    }
  
    changePlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
      this.players[this.currentPlayerIndex].isPlaying = true
      this.players[(this.currentPlayerIndex + 1) % this.players.length].isPlaying =
        false
    }
  
    updateScoreboard(player, diceRollNumber) {
      if (player) {
        player.score += diceRollNumber
      }
      this.players.forEach((player) => {
        const scoreBordCurrent = document.querySelector(
          `#current--${player.id - 1}`
        )
        scoreBordCurrent.textContent = player.score
      })
    }
  
    generateDiceNumber() {
      return Math.floor(Math.random() * 6) + 1
    }
  }
  
  const players = [new Player(1), new Player(2)]
  const game = new Game(players)
  
  // Add event listener to the roll button
  document.querySelector(".btn--roll").addEventListener("click", () => {
    game.rollDice()
  })
  
  // Add event listener to the new game button
  document.querySelector(".btn--new").addEventListener("click", () => {
    game.startGame()
  })