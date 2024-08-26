document.addEventListener('DOMContentLoaded', () => {
    // Example game state
    const gameState = {
        board: [
            ['P', 'E', 'E', 'E', 'P'],
            ['E', 'P', 'E', 'P', 'E'],
            ['E', 'E', 'P', 'E', 'E'],
            ['P', 'E', 'E', 'P', 'E'],
            ['P', 'E', 'P', 'E', 'P']
        ],
        currentTurn: 'player1'
    };

    renderGameBoard(gameState);
});

function renderGameBoard(gameState) {
    const gameBoardElement = document.getElementById('gameBoard');
    gameBoardElement.innerHTML = '';

    gameState.board.forEach(row => {
        row.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.textContent = cell === 'E' ? '' : cell; // Show 'P' or leave empty
            gameBoardElement.appendChild(cellElement);
        });
    });

    // Update current turn
    document.getElementById('currentTurn').textContent = `Current Turn: ${gameState.currentTurn}`;
}
