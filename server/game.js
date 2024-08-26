class Game {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'A'; // Start with player A
        this.players = {
            'A': {
                characters: [], // Store character positions and types
            },
            'B': {
                characters: [], // Store character positions and types
            }
        };
    }

    initializeBoard() {
        const board = Array(5).fill(null).map(() => Array(5).fill(null));
        return board;
    }

    deployCharacters(player, characters) {
        // Deploy characters at the start of the game
        if (player === 'A') {
            for (let i = 0; i < 5; i++) {
                const character = characters[i];
                this.board[0][i] = `${player}-${character}`;
                this.players[player].characters.push({ type: character, position: [0, i] });
            }
        } else if (player === 'B') {
            for (let i = 0; i < 5; i++) {
                const character = characters[i];
                this.board[4][i] = `${player}-${character}`;
                this.players[player].characters.push({ type: character, position: [4, i] });
            }
        }
    }

    moveCharacter(player, character, move) {
        const charInfo = this.players[player].characters.find(c => c.type === character);
        if (!charInfo) return { valid: false, message: 'Invalid character' };

        const [row, col] = charInfo.position;
        let newPosition;

        switch (move) {
            case 'L':
                newPosition = [row, col - 1];
                break;
            case 'R':
                newPosition = [row, col + 1];
                break;
            case 'F':
                newPosition = player === 'A' ? [row + 1, col] : [row - 1, col];
                break;
            case 'B':
                newPosition = player === 'A' ? [row - 1, col] : [row + 1, col];
                break;
            case 'FL':
                newPosition = player === 'A' ? [row + 2, col - 2] : [row - 2, col + 2];
                break;
            case 'FR':
                newPosition = player === 'A' ? [row + 2, col + 2] : [row - 2, col - 2];
                break;
            case 'BL':
                newPosition = player === 'A' ? [row - 2, col - 2] : [row + 2, col + 2];
                break;
            case 'BR':
                newPosition = player === 'A' ? [row - 2, col + 2] : [row + 2, col - 2];
                break;
            default:
                return { valid: false, message: 'Invalid move' };
        }

        // Check if the move is out of bounds
        if (this.isOutOfBounds(newPosition)) return { valid: false, message: 'Move out of bounds' };

        // Check if the target position is occupied by a friendly character
        if (this.isFriendlyOccupied(player, newPosition)) return { valid: false, message: 'Move targets a friendly character' };

        // Perform the move
        this.board[row][col] = null; // Remove character from old position
        const [newRow, newCol] = newPosition;
        const targetCell = this.board[newRow][newCol];

        // Handle combat if the target cell is occupied by an enemy character
        if (targetCell) {
            const targetPlayer = targetCell.charAt(0);
            if (targetPlayer !== player) {
                this.captureCharacter(targetPlayer, newPosition);
            } else {
                return { valid: false, message: 'Invalid move' }; // Friendly fire is invalid
            }
        }

        this.board[newRow][newCol] = `${player}-${character}`; // Place character in new position
        charInfo.position = newPosition; // Update character's position

        // Switch turn to the other player
        this.currentPlayer = this.currentPlayer === 'A' ? 'B' : 'A';

        return { valid: true, message: 'Move successful' };
    }

    isOutOfBounds(position) {
        const [row, col] = position;
        return row < 0 || row >= 5 || col < 0 || col >= 5;
    }

    isFriendlyOccupied(player, position) {
        const [row, col] = position;
        const targetCell = this.board[row][col];
        return targetCell && targetCell.startsWith(player);
    }

    captureCharacter(player, position) {
        const [row, col] = position;
        this.board[row][col] = null; // Remove the captured character from the board
        this.players[player].characters = this.players[player].characters.filter(c => c.position[0] !== row || c.position[1] !== col);
    }

    getGameState() {
        return {
            board: this.board,
            currentPlayer: this.currentPlayer,
        };
    }

    checkGameOver() {
        // Check if either player has lost all their characters
        if (this.players['A'].characters.length === 0) {
            return { gameOver: true, winner: 'B' };
        } else if (this.players['B'].characters.length === 0) {
            return { gameOver: true, winner: 'A' };
        } else {
            return { gameOver: false };
        }
    }
}

module.exports = Game;
