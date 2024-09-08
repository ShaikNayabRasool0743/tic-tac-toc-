const board = document.getElementById('board');
const cells = Array.from(board.getElementsByClassName('cell'));
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
const gameState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        status.textContent = ${currentPlayer} wins!;
        gameActive = false;
    } else if (gameState.every(cell => cell)) {
        status.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = ${currentPlayer}'s turn;
    }
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill('');
    cells.forEach(cell => cell.textContent = '');
    status.textContent = ${currentPlayer}'s turn;
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

// Initialize the game
status.textContent = ${currentPlayer}'s turn;
