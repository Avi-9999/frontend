// Simple Tic Tac Toe game using plain JavaScript

const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    const container = document.createElement('div');
    container.id = 'tic-tac-toe-board';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 100px)';
    container.style.gridGap = '5px';
    container.style.margin = '20px auto';
    container.style.width = 'max-content';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.style.width = '100px';
        cell.style.height = '100px';
        cell.style.fontSize = '2rem';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        container.appendChild(cell);
    }

    document.body.appendChild(container);

    const status = document.createElement('div');
    status.id = 'game-status';
    status.style.textAlign = 'center';
    status.style.marginTop = '10px';
    status.textContent = `Current Player: ${currentPlayer}`;
    document.body.appendChild(status);

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Restart Game';
    resetBtn.style.display = 'block';
    resetBtn.style.margin = '20px auto';
    resetBtn.addEventListener('click', resetGame);
    document.body.appendChild(resetBtn);
}

function handleCellClick(e) {
    const idx = e.target.dataset.index;
    if (!gameActive || board[idx]) return;

    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        document.getElementById('game-status').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('game-status').textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('game-status').textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    return winPatterns.some(pattern => 
        board[pattern[0]] &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[1]] === board[pattern[2]]
    );
}

function resetGame() {
    for (let i = 0; i < 9; i++) board[i] = null;
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('game-status').textContent = `Current Player: ${currentPlayer}`;
}

// Initialize the game on page load
window.onload = createBoard;