const GameBoard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(" ");
        }
    }

    const getBoard = () => board;

    const placeMarker = (marker = " ", row, column) => {
        board[row][column] = marker;
    }

    // const checkAvailability = (row, column) => {
    //     let openCell;
    //     if (board[row][column] === " ") {
    //         openCell = true;
    //     } else {
    //         openCell = false;
    //     }
    //     return openCell;
    // }

    const checkAvailability = (row, column) => board[row][column] === " ";

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            console.log(board[i]);
        }
        console.log("");
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
        getBoard, placeMarker, checkAvailability, printBoard, checkForWinner
    }
})();

function createPlayer(name, marker) {
    return {name, marker};
}

function switchActiveMarker(marker) {
    let newMarker;
    if (marker === player1.marker) {
        newMarker = player2.marker;
    } else {
        newMarker = player1.marker;
    }
    return newMarker;
}

function switchActivePlayer(activePlayer) {
    let newActivePlayer;
    if (activePlayer === player1.name) {
        newActivePlayer = player2.name;
    } else {
       newActivePlayer = player1.name;
    }
    return newActivePlayer;
}

function announceWinner(marker) {
    let winningPlayer;
    if (marker === player1.marker) {
        winningPlayer = player1.name;
    } else {
        winningPlayer = player2.name;
    }
    console.log(`${winningPlayer} has won the game!`);
}

function gameController() {
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
                announceWinner(activeMarker);
            }
        }
        activeMarker = switchActiveMarker(activeMarker);
        activePlayer = switchActivePlayer(activePlayer);
    }
    if (winnerFound === false) {
        console.log("This game is a tie!");
    }
}
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");
gameController();
// GameBoard.getBoard();
// console.log(GameBoard.checkAvailability(0, 0));
// GameBoard.placeMarker("O", 0, 0);
// GameBoard.placeMarker("X", 0, 1);
// GameBoard.placeMarker("O", 1, 1);
// GameBoard.placeMarker("X", 0, 2);
// GameBoard.placeMarker("O", 2, 0);
// GameBoard.placeMarker("X", 1, 0);
// GameBoard.placeMarker("O", 2, 1);
// GameBoard.placeMarker("X", 2, 2);
// GameBoard.placeMarker("O", 1, 2);
// GameBoard.printBoard();
// console.log(GameBoard.checkForWinner());

