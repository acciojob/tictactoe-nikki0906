//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        startGame(player1, player2);
    } else {
        alert("Please enter names for both players.");
    }
});

function startGame(player1, player2) {
    const board = document.querySelector('.board');
    const message = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    board.style.display = 'grid';
    message.textContent = `${player1}, you're up!`;

    let currentPlayer = player1;
    let currentSymbol = 'X';
    let gameActive = true;
    const gameState = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const cellIndex = parseInt(cell.id) - 1;

            if (gameState[cellIndex] === '' && gameActive) {
                gameState[cellIndex] = currentSymbol;
                cell.textContent = currentSymbol;
                if (checkWin(gameState, currentSymbol)) {
                    message.textContent = `${currentPlayer}, congratulations you won!`;
                    gameActive = false;
                } else if (gameState.every(cell => cell !== '')) {
                    message.textContent = `It's a draw!`;
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
                    message.textContent = `${currentPlayer}, you're up!`;
                }
            }
        });
    });
}

function checkWin(gameState, currentSymbol) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        return combo.every(index => gameState[index] === currentSymbol);
    });
}

