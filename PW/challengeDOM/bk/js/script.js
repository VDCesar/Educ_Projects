//Player classe
class Player {
    constructor(id, score) {
        this.id = id
        this.score = score
        this.isPlaying = false
    }
  
    // Method to increase the player's score
    increaseScore(points) {
      this.score += points;
    }
  
    // Method to reset the player's score to 0
    resetScore() {
      this.score = 0;
    }
   
    // Method to get the player's score
    getScore() {
      return this.score;
    }
    
  }


//Creating Players
const players = [
    new Player(1,0),
    new Player(2,0)
]


//const player1 = new Player(1,0)
//const player2 = new Player(2,0)

//selecting elements
const btn_new                    = document.querySelector(".btn--new")
const btn_roll                   = document.querySelector(".btn--roll")
const btn_hold                   = document.querySelector(".btn--hold")
const dice_image                 = document.querySelector(".dice")
const player1_score_bord         = document.querySelector("#score--0")
const player2_score_bord         = document.querySelector("#score--1")
const player1_score_bord_current = document.querySelector("#current--0")
const player2_score_bord_current = document.querySelector("#current--1")

//game is running
let gameIsRunning   = false 


//generate a ramdom dice number
function generateDiceNumber() {
    return Math.floor(Math.random() * 6) + 1
}

//init game
function init() {
    gameIsRunning = true

    //reset the players scores
    players[0].resetScore()
    players[1].resetScore()    
    console.log(`Placer ${players[0].id} score: ${players[0].getScore()}`)
    console.log(`Placer ${players[1].id} score: ${players[1].getScore()}`)

    //update the score board
    //console.log(player1_score_bord)    
    player1_score_bord.textContent = players[0].getScore()
    player2_score_bord.textContent = players[1].getScore()
    player1_score_bord_current.textContent = players[0].getScore()
    player2_score_bord_current.textContent = players[1].getScore()

    // player1 is the first player
    players[0].isPlaying = true
    players[1].isPlaying = false

}

//change between 
function changePlayer(Players){
    if(players[0].isPlaying){
        players[0].isPlaying = false
        players[1].isPlaying = true
    }
    if(players[1].isPlaying){
        players[1].isPlaying = false
        players[0].isPlaying = true
    }
}

//change dice image acording to the number rolled
function gamePlay() {
    //user can only roll the dice if the game is running
    if(!gameIsRunning){
        alert('First you need to start the game! ;)')
        return
    }

    let diceRoll_number = generateDiceNumber()
    console.log(`Dice out ${diceRoll_number}`)
    
    //display dice image
    dice_image.setAttribute("src", `img/dice-${diceRoll_number}.png`)
    
    //add score to the correct player
    // Add the score to the current player
    if (diceRoll_number > 1) {
      const currentPlayer = getCurrentPlayer()
      currentPlayer.increaseScore(diceRoll_number)
      updatePlayerScoreboard(currentPlayer, diceRoll_number)
    } else {
      changePlayer(players);
    }   
}

//get the correct player
function getCurrentPlayer() {
    //return the current player
    return players[0].isPlaying ? players[0] : players[1]
}

//update score
 function updatePlayerScoreboard(players, diceRoll_number) {
    //get the correct player and update score
    const currentPlayer_ = getCurrentPlayer()
    //update the score
    if(currentPlayer_ == players[0]){
        player1_score_bord_current.textContent = currentPlayer_.score
        currentPlayer_.score += diceRoll_number
    } 
    if(currentPlayer_ == players[1]){
        player2_score_bord_current.textContent = currentPlayer_.score    
        currentPlayer_.score += diceRoll_number
    }
}

//btn roll the dice
btn_roll.addEventListener("click", gamePlay)

//btn new game
btn_new.addEventListener("click", init)

