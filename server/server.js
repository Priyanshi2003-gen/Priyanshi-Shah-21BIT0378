const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const Game = require('./game');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Initialize the game
let game = new Game();

wss.on('connection', (ws) => {
    // When a new client connects, send the initial game state
    ws.send(JSON.stringify({ type: 'init', gameState: game.getGameState() }));

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        handleGameMessage(parsedMessage, ws);
    });
});

function handleGameMessage(message, ws) {
    switch (message.type) {
        case 'deploy': // Handle character deployment at the start
            handleDeploy(message, ws);
            break;
        case 'move': // Handle player move
            handleMove(message, ws);
            break;
        default:
            ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
            break;
    }
}

function handleDeploy(message, ws) {
    const { player, characters } = message;

    // Deploy characters for the player
    game.deployCharacters(player, characters);

    // Broadcast the updated game state to all connected clients
    broadcastGameState();
}

function handleMove(message, ws) {
    const { player, character, move } = message;

    // Process the move and update the game state
    const result = game.moveCharacter(player, character, move);

    if (result.valid) {
        // Check if the game is over
        const gameOver = game.checkGameOver();
        if (gameOver.gameOver) {
            // Broadcast the game over notification
            broadcastGameOver(gameOver.winner);
        } else {
            // Broadcast the updated game state to all connected clients
            broadcastGameState();
        }
    } else {
        // Send an invalid move notification to the client
        ws.send(JSON.stringify({ type: 'invalidMove', message: result.message }));
    }
}

function broadcastGameState() {
    const gameState = game.getGameState();

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'update', gameState }));
        }
    });
}

function broadcastGameOver(winner) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'gameOver', winner }));
        }
    });
}

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
