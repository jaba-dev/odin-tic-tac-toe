// app.js

// Factory function for creating player objects
const createPlayer = (name, symbol) => {
  return {
    name,
    symbol,
  };
};

// Module pattern for managing the game logic
const gameModule = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer;
  let winner = null;
  const players = [
    createPlayer("Player 1", "X"),
    createPlayer("Player 2", "O"),
  ];

  const boardElement = document.querySelector(".board");
  const infoDisplay = document.querySelector(".info");

  const renderBoard = () => {
    boardElement.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = board[i];
      if (cell.textContent === "O") {
        cell.classList.add("circle");
      }
      cell.addEventListener("click", () => {
        if (board[i] === "" && !winner) {
          makeMove(i);
        }
      });
      boardElement.appendChild(cell);
    }
  };

  const makeMove = (index) => {
    board[index] = currentPlayer.symbol;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = currentPlayer;
        break;
      }
    }
    if (winner) {
      infoDisplay.innerHTML = `${currentPlayer.name} wins!`;
      // boardElement.innerHTML = "";
    } else if (!board.includes("")) {
      infoDisplay.innerHTML = "It's a tie!";
      // boardElement.innerHTML = "";
    }
  };

  const startGame = () => {
    currentPlayer = players[0];
    renderBoard();
  };

  return { startGame };
})();

gameModule.startGame();

// In this example, the createPlayer factory function creates player objects with a name and a symbol ('X' or 'O'). The gameModule uses the module pattern to encapsulate the game logic and manage the state of the game. It keeps track of the current player, the board state, and checks for a winner or a tie.

// The HTML file includes a simple grid-based layout for the tic-tac-toe board. The JavaScript code listens for clicks on the cells and triggers the makeMove function when a valid move is made. The game is rendered using the renderBoard function, which creates the cell elements and updates their content based on the current board state.

// You can save the HTML and JavaScript code into separate files (index.html and app.js, for example) and open the HTML file in a web browser to play the game.
