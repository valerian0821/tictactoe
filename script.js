const GameBoard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(placeMarker());
        }
    }

    const getboard = () => board;

    const placeMarker = (marker = " ") => {
        return marker;
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
})();
