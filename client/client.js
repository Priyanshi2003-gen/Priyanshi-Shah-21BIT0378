const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function () {
    console.log('Connected to the server');
});

socket.addEventListener('message', function (event) {
    const message = JSON.parse(event.data);
    if (message.type === 'init' || message.type === 'update') {
        renderGameBoard(message.gameState);
    }
});

function renderGameBoard(gameState) {
    const board = gameState.board;
    const gameBoardElement = document.getElementById('gameBoard');
    gameBoardElement.innerHTML = '';

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[row][col]) {
                const piece = document.createElement('div');
                piece.className = 'piece';
                piece.innerText = board[row][col];
                cell.appendChild(piece);
            }
            gameBoardElement.appendChild(cell);
        }
    }
}

document.getElementById('moveButton').addEventListener('click', function () {
    const move = prompt('Enter your move (e.g., P1:L)');
    const message = {
        type: 'move',
        player: 'A', // or 'B'
        character: move.split(':')[0],
        move: move.split(':')[1],
    };
    socket.send(JSON.stringify(message));
});
