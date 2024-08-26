# Mini Game
This is a turn-based chess-like game with a server-client architecture, using WebSockets for real-time communication. The project includes a backend server that manages the game logic and a frontend client that allows players to interact with the game.

## Table of Contents

-Installation

-Running the Project

-File Structure

-Game Flow

-Edge Cases Handled

## Installation
### Prerequisites
Node.js (v14.x or later)

npm (comes with Node.js)

## Steps

### 1. Clone the repository:
git clone https://github.com/Priyanshi2003-gen/Priyanshi-Shah-21BIT0378.git

cd Priyanshi-Shah-21BIT0378

### 2. Install dependencies for the server:
cd server

npm install

### 3. Install dependencies for the client:
cd ../client

npm install

### 4. Running the Project


#### Running the Server
Navigate to the server directory:
cd server

Start the server:
npm start

This will run the server on http://localhost:8081 by default.


#### Running the Client
In a new terminal, navigate to the client directory:

cd client


Start the client:

npm start

This will run the client on http://localhost:8081 by default.

## Accessing the Game
Open a web browser and navigate to http://localhost:8081 to start playing the game.

## File Structure

### Server (server folder)

1. index.js: The entry point of the server application. Sets up the Express server and WebSocket connections.
2. game.js: Contains the main game logic, including board initialization, player turns, and move validation.
3. package.json: Contains the server's dependencies and scripts.
   
### Client (client folder)

1. index.html: The main HTML file that sets up the game interface.
2. style.css: Contains the CSS styles for the game, including the 5x5 grid and game board layout.
3. client.js: Manages the WebSocket connection, handles messages from the server, and updates the UI based on the game state.
4. package.json: Contains the client's dependencies and scripts.

   
## Game Flow

1. Initialization: When a player opens the game, a WebSocket connection is established with the server. The server sends the initial game state to the client.
2. Character Deployment: Players deploy their characters on the board. The deployment is validated and processed by the server.
3. Turns: Players take turns to move their characters. The current player’s turn is highlighted on the client interface.
4. Move Validation: Each move is validated by the server to ensure it follows the game rules.
5. Game Over: The server checks after each move whether the game is over. If a player wins, the game over state is broadcast to all clients.
6. New Game: After a game ends, players have the option to start a new game.

## Edge Cases Handled

1. Invalid Moves: The server checks for moves that are not allowed by the game rules (e.g., moving out of bounds or to an occupied cell) and sends an error message to the client.
2. Concurrent Moves: The server ensures that only the current player can make a move, preventing simultaneous actions.
3. Game Over: The server correctly identifies when a game is over and broadcasts this state to prevent further moves.

## Additional Notes

1. Ensure that both the server and client are running simultaneously for the game to work.
2. The game logic, including the validation of moves and handling of game states, is primarily stored in the game.js file on the server side.
3. The client-side script (client.js) manages the UI and interaction with the server through WebSockets.
