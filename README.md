## Chess-Like Game
This is a turn-based chess-like game with a server-client architecture, using WebSockets for real-time communication. The project includes a backend server that manages the game logic and a frontend client that allows players to interact with the game.

# Table of Contents
Installation
Running the Project
File Structure
Game Flow
Edge Cases Handled

# Installation
Prerequisites
Node.js (v14.x or later)
npm (comes with Node.js)

# Steps
Clone the repository:

bash
Copy code
git clone https://github.com/Priyanshi2003-gen/Priyanshi-Shah-21BIT0378.git
cd Priyanshi-Shah-21BIT0378
Install dependencies for the server:

bash
Copy code
cd server
npm install
Install dependencies for the client:

bash
Copy code
cd ../client
npm install
Running the Project
Running the Server
Navigate to the server directory:
bash
Copy code
cd server
Start the server:
bash
Copy code
npm start
This will run the server on http://localhost:8081 by default.
Running the Client
In a new terminal, navigate to the client directory:
bash
Copy code
cd client
Start the client:
bash
Copy code
npm start
This will run the client on http://localhost:3000 by default.
Accessing the Game
Open a web browser and navigate to http://localhost:3000 to start playing the game.
File Structure
Server (server folder)
index.js: The entry point of the server application. Sets up the Express server and WebSocket connections.
game.js: Contains the main game logic, including board initialization, player turns, and move validation.
package.json: Contains the server's dependencies and scripts.
Client (client folder)
index.html: The main HTML file that sets up the game interface.
style.css: Contains the CSS styles for the game, including the 5x5 grid and game board layout.
client.js: Manages the WebSocket connection, handles messages from the server, and updates the UI based on the game state.
package.json: Contains the client's dependencies and scripts.
Game Flow
Initialization: When a player opens the game, a WebSocket connection is established with the server. The server sends the initial game state to the client.
Character Deployment: Players deploy their characters on the board. The deployment is validated and processed by the server.
Turns: Players take turns to move their characters. The current player’s turn is highlighted on the client interface.
Move Validation: Each move is validated by the server to ensure it follows the game rules.
Game Over: The server checks after each move whether the game is over. If a player wins, the game over state is broadcast to all clients.
New Game: After a game ends, players have the option to start a new game.
Edge Cases Handled
Invalid Moves: The server checks for moves that are not allowed by the game rules (e.g., moving out of bounds or to an occupied cell) and sends an error message to the client.
Concurrent Moves: The server ensures that only the current player can make a move, preventing simultaneous actions.
Game Over: The server correctly identifies when a game is over and broadcasts this state to prevent further moves.
Additional Notes
Ensure that both the server and client are running simultaneously for the game to work.
The game logic, including the validation of moves and handling of game states, is primarily stored in the game.js file on the server side.
The client-side script (client.js) manages the UI and interaction with the server through WebSockets.
