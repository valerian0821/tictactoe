const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

const GameBoard = (function () {
    const rows = 3;
    const columns = 3;
    let turnsTaken = 0;
    let marker = player1.marker;
    let name = player1.name;
    const board = [];
    
    const getBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(" ");
            }
        }
        return board;
    }

    const getActiveMarker = () => marker;

    const switchActiveMarker = (activeMarker) => {
        if (activeMarker === player1.marker) {
            marker = player2.marker;
        } else {
            marker = player1.marker;
        }
    }

    const updateNames = () => {
        name = player1.name;
    }

    const getActiveName = () => name;

    const switchActiveName = (activeName) => {
        if (activeName === player1.name) {
            name = player2.name;
        } else {
            name = player1.name;
        }
    }

    const placeMarker = (marker = " ", row, column) => {
        board[row][column] = marker;
    }

    const checkAvailability = (row, column) => board[row][column] === " ";

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            console.log(board[i]);
        }
        console.log("");
    }

    const getTurnCount = () => turnsTaken;

    const UpdateNumOfTurns = () => {
        turnsTaken++;
    }

    const resetBoard = () => {
        turnsTaken = 0;
        marker = player1.marker;
        name = player1.name;
        for (let i = 0; i < board.length; i++) {
            board.pop();
        }
    }

    const checkForWinner = () => {
        let winnerFound = false;

        //Checks top-left horizontally to top-right
        if (board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
            winnerFound = true;
        
        //Checks top-left diagonally to bot-right
        } else if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== " ") {
            winnerFound = true;
        
        //Checks top-left vertically to bot-left
        } else if (board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== " ") {
            winnerFound = true;

        //Checks top-mid vertically to bot-mid
        } else if (board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] !== " ") {
            winnerFound = true;

        //Checks top-right diagonally to bot-left
        } else if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== " ") {
            winnerFound = true;

        //Checks top-right vertically to bot-right
        } else if (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== " ") {
            winnerFound = true;

        //Checks mid-left horizontally to mid-right
        } else if (board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== " ") {
            winnerFound = true;

        //Checks bot-left horizontally to bot-right
        } else if (board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== " ") {
            winnerFound = true;
        }
        return winnerFound;
    }
    return {
        getBoard, placeMarker, checkAvailability, printBoard, checkForWinner, UpdateNumOfTurns, getTurnCount, getActiveMarker, getActiveName,
        switchActiveMarker, switchActiveName, resetBoard, updateNames
    }
})();

function createPlayer(name, marker) {
    return {name, marker};
}

function switchActiveMarkerConsole(marker) {
    let newMarker;
    if (marker === player1.marker) {
        newMarker = player2.marker;
    } else {
        newMarker = player1.marker;
    }
    return newMarker;
}

function switchActivePlayerConsole(activePlayer) {
    let newActivePlayer;
    if (activePlayer === player1.name) {
        newActivePlayer = player2.name;
    } else {
       newActivePlayer = player1.name;
    }
    return newActivePlayer;
}

function announceWinnerConsole(marker) {
    let winningPlayer;
    if (marker === player1.marker) {
        winningPlayer = player1.name;
    } else {
        winningPlayer = player2.name;
    }
    console.log(`${winningPlayer} has won the game!`);
}

function gameControllerConsole() {
    GameBoard.getBoard();
    let winnerFound = false;
    let numOfTurns = 0;
    let activeMarker = player1.marker;
    let activePlayer = player1.name
    while (winnerFound === false && numOfTurns < 9) {
        console.log(`It is ${activePlayer}'s turn.`);
        let rowInput = prompt("Enter Row Number: ");
        let columnInput = prompt("Enter Column Number: ");
        while (GameBoard.checkAvailability(rowInput, columnInput) === false) {
            rowInput = prompt("Invalid. Re-enter Row Number: ");
            columnInput = prompt("Re-enter Column Number: ")
        }
        GameBoard.placeMarker(activeMarker, rowInput, columnInput);
        GameBoard.printBoard();
        numOfTurns++;

        //Cannot win in tic-tac-toe until at least the 5th turn (First player's third turn)
        if (numOfTurns >= 5) {
            winnerFound = GameBoard.checkForWinner();
            if (winnerFound) {
                announceWinnerConsole(activeMarker);
            }
        }
        activeMarker = switchActiveMarkerConsole(activeMarker);
        activePlayer = switchActivePlayerConsole(activePlayer);
    }
    if (winnerFound === false) {
        console.log("This game is a tie!");
    }
}

function startGame() {
    DisplayController.openDialog();
}

function continueStartGame () {
    GameBoard.updateNames();
    let activeName = GameBoard.getActiveName();
    let activeMarker = GameBoard.getActiveMarker();
    DisplayController.displayPlayerTurn(activeName, activeMarker);
    DisplayController.addCellListeners();
    DisplayController.removeStartListener();
}

function handleNameSubmit (event) {
    event.preventDefault();
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
    player1.name = player1Name;
    player2.name = player2Name;
    DisplayController.closeDialog();
    continueStartGame();
}

function gameControllerDisplay(row, col) {

    //Starts the game
    if (GameBoard.getTurnCount() === 0) {
        GameBoard.getBoard();
    }
    
    if (!GameBoard.checkAvailability(row, col)) return;
    let activeName = GameBoard.getActiveName();
    let activeMarker = GameBoard.getActiveMarker();
    let winnerFound = false;
    GameBoard.placeMarker(activeMarker, row, col);
    DisplayController.displayMarker(activeMarker, row, col);
    GameBoard.UpdateNumOfTurns();
    if (GameBoard.getTurnCount() >= 5) {
        let winnerFound = GameBoard.checkForWinner();
        if (winnerFound === true) {
            DisplayController.announceWinner(activeName, activeMarker);
            DisplayController.removeCellListeners();
            return;
        }
    }
    if (GameBoard.getTurnCount() === 9 && winnerFound === false) {
        DisplayController.announceDraw();
        DisplayController.removeCellListeners();
        return;
    }
    if (winnerFound === false) {
        GameBoard.switchActiveMarker(activeMarker);
        GameBoard.switchActiveName(activeName);
        activeName = GameBoard.getActiveName();
        activeMarker = GameBoard.getActiveMarker();
        DisplayController.displayPlayerTurn(activeName, activeMarker);
    }
}

const DisplayController = (function () {
    const body = document.querySelector("body");

    const titleDiv = document.createElement("div");
    const gameTitle = document.createElement("h1");

    const displayDiv = document.createElement("div");
    const display = document.createElement("p");

    const boardDiv = document.createElement("div");
    const btnDiv = document.createElement("div");
    const startBtn = document.createElement("btn");
    const restartBtn = document.createElement("btn");
    const dialog = document.createElement("dialog");

    const displayGameTitle = () => {
        body.appendChild(titleDiv);
        titleDiv.id = "title-div";
        gameTitle.textContent = "Tic Tac Toe";
        titleDiv.appendChild(gameTitle);
    }

    const displayResult = () => {
        body.appendChild(displayDiv);
        displayDiv.id = "display-div";
        displayDiv.appendChild(display);
    }

    const displayBoard = () => {
        body.appendChild(boardDiv);
        boardDiv.id = "board";

        let rows = 3;
        let cols = 3;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col ++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                boardDiv.appendChild(cell);
            }
        }
    }

    const displayBtns = () => {
        body.appendChild(btnDiv);
        btnDiv.id = "btn-div";
        startBtn.classList.add("btn");
        startBtn.textContent = "Start Game";
        restartBtn.classList.add("btn");
        restartBtn.textContent = "Restart Game";
        btnDiv.appendChild(startBtn);
        btnDiv.appendChild(restartBtn);
    }

    const createDialog = () => {
        dialog.innerHTML = `
            <form>
                <h3>Enter Your Names</h3>
                <div>
                    <label for="player1">Player 1 (X): </label>
                    <input type="text" id="player1" name="player1" required>
                </div>
                <div>
                    <label for="player2">Player 2 (O): </label>
                    <input type="text" id="player2" name="player2" required>
                </div>
                <button id="dialog-btn" type="submit">Submit</button>
            </form>`;
        body.appendChild(dialog);
    }

    const openDialog = () => {
        dialog.showModal();
    }

    const closeDialog = () => {
        dialog.close();
    }

    const handleStartListener = () => {
        startGame();
    }

    const removeStartListener = () => {
        startBtn.removeEventListener("click", handleStartListener);
    }

    const addStartListener = () => {
        startBtn.addEventListener("click", handleStartListener);
    }

    const addRestartListener = () => {
        restartBtn.addEventListener("click", () => {
            GameBoard.resetBoard();
            removeCellListeners();
            removeMarkers();
            startGame();
        });
    }

    const handleCellClick = (event) => {
        if (event.target.classList.contains("cell")) {
            let row = event.target.dataset.row;
            let col = event.target.dataset.col;
            gameControllerDisplay(row, col);
        }
    };
    
    const addCellListeners = () => {
        boardDiv.addEventListener("click", handleCellClick);
    };
    
    const removeCellListeners = () => {
        boardDiv.removeEventListener("click", handleCellClick);
    };

    const addFormBtnListener = () => {
        const form = document.querySelector("form");
        form.addEventListener("submit", handleNameSubmit);
    }

    const displayMarker = (marker, row, col) => {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = marker;
    }

    const removeMarkers = () => {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });
    };

    const displayPlayerTurn = (name, marker) => {
        display.textContent = `(${marker}) ${name}'s Turn:`;
    }

    const announceWinner = (name, marker) => {
        display.textContent = `(${marker}) ${name} has won the game!`;
    }

    const announceDraw = () => {
        display.textContent = "The game is a draw!";
    }

    return {
        displayGameTitle, displayResult, displayBoard, displayBtns, addCellListeners, displayMarker, removeMarkers, displayPlayerTurn, announceWinner, 
        removeCellListeners, announceDraw, addStartListener, removeStartListener, handleStartListener, addRestartListener, createDialog, 
        addFormBtnListener, openDialog, closeDialog
    }
})();

DisplayController.displayGameTitle();
DisplayController.displayResult();
DisplayController.displayBoard();
DisplayController.displayBtns();
DisplayController.addStartListener();
DisplayController.addRestartListener();
DisplayController.createDialog();
DisplayController.addFormBtnListener();
