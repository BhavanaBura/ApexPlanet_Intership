let userScore = 0;
let computerScore = 0;

function play(userChoice) {
    let choices = ['rock', 'paper', 'scissors'];
    let computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let resultText = "";

    if (userChoice === computerChoice) {
        resultText = "It's a draw! 🤝";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultText = "You win! 🎉";
        userScore++;
    } else {
        resultText = "You lose! 😞";
        computerScore++;
    }

    document.getElementById("result").innerText = 
        `You chose ${userChoice} - Computer chose ${computerChoice}. ${resultText}`;

    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;

    updateBackgroundColor();
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    document.getElementById("result").innerText = "";
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;

    updateBackgroundColor();
}

function updateBackgroundColor() {
    if (userScore > computerScore) {
        document.body.style.backgroundColor = "#28a745";  // green
    } else if (computerScore > userScore) {
        document.body.style.backgroundColor = "#dc3545";  // red
    } else {
        document.body.style.backgroundColor = "#ffffff";  // white
    }
}
