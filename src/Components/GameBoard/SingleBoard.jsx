import "./SingleBoard.css";
import {useEffect, useState} from "react";
import * as Constants from '../Constants';
import {CgShapeCircle, ImCross} from "react-icons/all";
import * as BoardUtils from './BoardUtils';

const INITIAL_CELLS = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

const SingleBoard = (props) => {
    const [currentCells, setCurrentCells] = useState(INITIAL_CELLS);
    const [selectedCell, setSelectedCell] = useState(-1);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        if (props.newGame) {
            initState();
        }
    }, [props.newGame]);

    const initState = () => {
        setCurrentCells(INITIAL_CELLS);
        setSelectedCell(-1);
        setWinner('');
    };

    const cellClickedHandler = (cellIndex) => {
        const newCellValue = props.activePlayer === Constants.FIRST_PLAYER ? 1 : 2;
        setSelectedCell(cellIndex);
        setCurrentCells((prevState) => {
            const newCells = [...prevState];
            newCells[cellIndex] = newCellValue;
            return newCells;
        });
    };

    useEffect(() => {
        if (selectedCell !== -1) {
            if (BoardUtils.InThreeSequence(selectedCell, currentCells)) {
                setWinner(props.activePlayer);
                props.onSingleBoardWin();

            } else if (!BoardUtils.havePossibleMoves(currentCells)) {
                props.onSingleBoardDraw();
            }

            props.onTurnFinished(selectedCell);

        }
    }, [currentCells]);


    return (
        <div className={`board-grid ${!props.boardIsActive ? 'disabled' : ''} won-by-${winner}`}>
            {currentCells.map((cell, index) => (
                <button disabled={cell !== -1 || !props.boardIsActive} key={index}
                        onClick={() => (cellClickedHandler(index))}
                        className="board-cell">
                    {cell === 1 && <ImCross color="blue"></ImCross>}
                    {cell === 2 && <CgShapeCircle size="25px" color="red"></CgShapeCircle>}
                </button>
            ))}
        </div>
    );
};

export default SingleBoard;
