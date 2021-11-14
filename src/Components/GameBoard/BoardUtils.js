export const InThreeSequence = (selectedCell, board) => {
    const columnIndex = selectedCell % 3;
    const rowIndex = selectedCell >= 3 ? (selectedCell >= 6 ? 2 : 1) : 0;
    return checkRow(rowIndex, board) || checkColumn(columnIndex, board) || checkDiagonal(rowIndex, columnIndex, selectedCell, board);
}

const checkRow = (rowIndex, board) => {
    const startIndex = rowIndex * 3;
    return board[startIndex] === board[startIndex + 1] &&
        board[startIndex + 1] === board[startIndex + 2];
}
const checkColumn = (columnIndex, board) => {
    const startIndex = columnIndex;
    return board[startIndex] === board[startIndex + 3] &&
        board[startIndex + 3] === board[startIndex + 6];
}
const checkDiagonal = (rowIndex, columnIndex, selectedCell, board) => {
    if (selectedCell === 4 || rowIndex * columnIndex % 2 === 0) {
        return (board[0] === board[4] && board[4] === board[8] && board[8] !== -1) ||
            (board[2] === board[4] && board[4] === board[6]) && board[6] !== -1;
    } else {
        return false;
    }
}

export const havePossibleMoves = (boardCells) => {
    let havePossibleMoves = false;
    boardCells.forEach(cell => {
        if (cell === -1) {
            havePossibleMoves = true;
        }
    });
    return havePossibleMoves;
}