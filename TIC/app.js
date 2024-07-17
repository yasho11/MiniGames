let board = [
    "", "", "",  // 0, 1, 2
    "", "", "",  // 3, 4, 5
    "", "", ""   // 6, 7, 8
];

let humanPlayer = "O"; // Human player is 'O'
let aiPlayer = "X";    // AI player is 'X'
let currentPlayer = humanPlayer; // Start with human player
let turn = 0; // 0 for human, 1 for AI

let humanScore = 0;
let aiScore = 0;
let draws = 0;

// Winning combinations based on box numbers
const winningCombinations = [
    [0, 1, 2],  // 012
    [3, 4, 5],  // 345
    [6, 7, 8],  // 678
    [0, 3, 6],  // 036
    [1, 4, 7],  // 147
    [2, 5, 8],  // 258
    [0, 4, 8],  // 048
    [2, 4, 6]   // 246
];

// Function to check for win
function checkWin(board, player) {
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

// Function to check if the board is full (tie condition)
function isBoardFull(board) {
    return board.every(cell => cell !== "");
}

// Function to calculate AI's move using Minimax algorithm
function aiMove(board) {
    let bestScore = -Infinity;
    let bestMove;

    // Iterate over all empty spots and evaluate each move
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = aiPlayer; // Try the move

            // Minimax recursive call to evaluate the move
            let score = minimax(board, 0, false);

            // Undo the move
            board[i] = "";

            // Choose the move with the highest score
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    // Make the best move
    board[bestMove] = aiPlayer;
    if (!checkEndGame()) {
        turn = 0; // Switch turn back to human player
        currentPlayer = humanPlayer;
        renderBoard();
    }
}

// Minimax algorithm function
function minimax(board, depth, isMaximizing) {
    if (checkWin(board, humanPlayer)) {
        return -10; // Human wins
    } else if (checkWin(board, aiPlayer)) {
        return 10; // AI wins
    } else if (isBoardFull(board)) {
        return 0; // It's a tie
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = aiPlayer; // Try the move
                let score = minimax(board, depth + 1, false);
                board[i] = ""; // Undo the move
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = humanPlayer; // Try the move
                let score = minimax(board, depth + 1, true);
                board[i] = ""; // Undo the move
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

// Function to handle player's move
function playerMove(box) {
    if (box.innerHTML.trim() === "" && currentPlayer === humanPlayer) {
        box.innerHTML = humanPlayer;
        let index = parseInt(box.id);
        board[index] = humanPlayer;
        turn = 1; // Switch turn to AI
        currentPlayer = aiPlayer;
        if (!checkEndGame()) {
            aiMove(board); // AI makes its move
        }
    }
}

// Function to render the board
function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        let box = document.getElementById(i.toString());
        box.innerHTML = board[i];
    }
}

// Function to check end game conditions (win, tie)
function checkEndGame() {
    if (checkWin(board, humanPlayer)) {
        humanScore++;
        updateScore();
        alert("You win!");
        resetGame();
        return true;
    } else if (checkWin(board, aiPlayer)) {
        aiScore++;
        updateScore();
        alert("AI wins!");
        resetGame();
        return true;
    } else if (isBoardFull(board)) {
        draws++;
        updateScore();
        alert("It's a draw!");
        resetGame();
        return true;
    }
    return false;
}

// Function to update the scoreboard
function updateScore() {
    document.getElementById('human-score').textContent = humanScore;
    document.getElementById('ai-score').textContent = aiScore;
    document.getElementById('draws').textContent = draws;
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = 0;
    currentPlayer = humanPlayer;
    renderBoard();
}

// Setup initial board rendering and event listeners
function setupBoard() {
    for (let i = 0; i < 9; i++) {
        let box = document.getElementById(i.toString());
        box.addEventListener('click', function () {
            playerMove(box);
        });
    }
}

// Event listener for restart button
document.getElementById('restart-btn').addEventListener('click', function () {
    resetGame();
});

// Event listener for resume button
document.getElementById('resume-btn').addEventListener('click', function () {
    if (!checkEndGame()) {
        if (currentPlayer === aiPlayer) {
            aiMove(board);
        }
    }
});

// Event listener for back button
document.getElementById('back-btn').addEventListener('click', function () {
    alert("Going back to previous page...");
    // Implement your logic to navigate back to previous page or handle as needed
});

// Setup initial game setup
function init() {
    setupBoard();
    updateScore();
}

init(); // Start the game setup
 