let scissor = document.getElementById("Scissor");
let paper = document.getElementById("Paper");
let rock = document.getElementById("Rock");
let player = 0;
let AI;
let score = 0;
let scoreDisplay = document.getElementById("score");
let PlayerChoice = document.getElementById("player_choice");
let AIChoice = document.getElementById("computers choice");
let Winner = document.getElementById("winner");

scissor.addEventListener('click', function(){

    let player = 1;
    PlayerChoice.innerHTML = "Scissor";
    gameset(player);
})

paper.addEventListener('click', function(){

    let player = 2;
    PlayerChoice.innerHTML = "Paper";
    gameset(player);
})
rock.addEventListener('click', function(){

    let player = 3;
    PlayerChoice.innerHTML = "Rock";
    gameset(player);
})




function randomAIChoice() {
    return Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
}



function gameset(player) {
    AI = randomAIChoice();
    AIChoice.innerHTML = ((AI === 1 ? "Scissors" : AI === 2 ? "Paper" : "Rock"));
    if(
        (AI == 1 && player == 2)||
        (AI == 2 && player == 3)||
        (AI == 3 && player == 1)
    ){
        Winner.innerHTML = "Computer";
        scoreSub();
    }
    else if(AI == player){
        Winner.innerHTML = "DRAW";
    }
    else{
        Winner.innerHTML = ("Player");
        ScoreAdd(); 
    }
    
}

function ScoreAdd() 
{
    score += 1;
    scoreDisplay.innerHTML =  score;
}
function scoreSub()
{
    if(score > 0 ){
        score -= 1;

    }
    scoreDisplay.innerHTML =  score;
}