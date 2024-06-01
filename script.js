//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');
    let player1, player2;
    let currentPlayer;
    let board;
    let gameActive = false;

    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    submitButton.addEventListener('click', () => {
        player1 = player1Input.value;
        player2 = player2Input.value;
        if (player1 && player2) {
            currentPlayer = player1;
            messageDiv.textContent = `${currentPlayer}, you're up!`;
            gameActive = true;
            board = ['', '', '', '', '', '', '', '', ''];
            player1Input.style.display = 'none';
            player2Input.style.display = 'none';
            submitButton.style.display = 'none';
        } else {
            alert('Please enter names for both players.');
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (gameActive && cell.textContent === '') {
                const cellIndex = cell.id - 1;
                board[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
                cell.textContent = board[cellIndex];
                if (checkWin()) {
                    messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
                    gameActive = false;
                } else if (board.every(cell => cell !== '')) {
                    messageDiv.textContent = 'It\'s a tie!';
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    messageDiv.textContent = `${currentPlayer}, you're up!`;
                }
            }
        });
    });

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a - 1] && board[a - 1] === board[b - 1] && board[a - 1] === board[c - 1];
        });
    }
});

