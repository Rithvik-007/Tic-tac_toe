// script for the play and back buttons
const startbtn = document.getElementById("startbtn");
const title = document.getElementById("title");
const gameboard = document.getElementById("gameboard")
const backbtn = document.getElementById("backbtn");

startbtn.addEventListener("click", () => {
    startbtn.style.display = "none";
    title.style.display = "none";
    gameboard.style.display = "block";
});

backbtn.addEventListener("click", () => {
    startbtn.style.display = "inline-block";
    title.style.display = "block";
    gameboard.style.display = "none";
});


// script for the game board
let board   = ["","","","","","","","",""];
  let currentPlayer = "X";
  let isGameActive  = true;
  const WINNING_COMBOS = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  // 2. cache DOM
  const cells    = Array.from(document.querySelectorAll('.cell'));
  const status   = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  const backBtn  = document.getElementById('backbtn');

  // 3. attach listeners
  cells.forEach((cell, idx) =>
    cell.addEventListener('click', () => handleCellClick(cell, idx))
  );
  resetBtn.addEventListener('click', resetGame);
  backBtn.addEventListener('click', () => {
    // your existing "go home" logic here, e.g.:
    // document.getElementById('gameboard').style.display = 'none';
    // document.getElementById('title').style.display = 'block';
    // document.getElementById('startbtn').style.display = 'block';
  });

  // initialize
  status.textContent = `Player ${currentPlayer}'s turn`;

  // 4. handle a move
  function handleCellClick(cell, idx) {
    if (!isGameActive || board[idx] !== "") return;
    board[idx] = currentPlayer;
    cell.textContent = currentPlayer;
    validateResult();
  }

  // 5. check for win / draw
  function validateResult() {
    let roundWon = false;
    for (const [a,b,c] of WINNING_COMBOS) {
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      endGame(`${currentPlayer} wins!`);
      return;
    }
    if (!board.includes("")) {
      endGame("Draw!");
      return;
    }

    // switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }

  // 6. end the game
  function endGame(message) {
    isGameActive = false;
    status.textContent = message;
    // now user can click Reset to play again
  }

  // 7. reset board
  function resetGame() {
    board.fill("");
    cells.forEach(c => c.textContent = "");
    currentPlayer = "X";
    isGameActive  = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
  }