import './MainBoard.css'
import SingleBoard from "./SingleBoard";
import * as Constants from '../Constants';
import {useEffect, useState} from "react";
import * as BoardUtils from './BoardUtils';


const INITIAL_RESULTS = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

const MainBoard = (props) => {
    const [activeBoardIndex, setActiveBoardIndex] = useState(-1);
    const [boardsResults, setBoardsResults] = useState([...INITIAL_RESULTS]);

    useEffect(() => {
        if (props.newGame) {
            initState();
        }
    }, [props.newGame]);

    useEffect(() => {
        if (props.gameOver) {
            // this will disable all remaining boards after a win, until user will create new game
            setActiveBoardIndex(-2);
        }
    }, [props.gameOver]);

    const initState = () => {
        setBoardsResults([...INITIAL_RESULTS]);
        setActiveBoardIndex(-1);
    };

    const singleBoardWinHandler = (singleBoardIndex) => {
        setBoardsResults((prevValue) => {
            prevValue[singleBoardIndex] = props.activePlayer === Constants.FIRST_PLAYER ? 1 : 2;
            return [...prevValue];
        });

        if (BoardUtils.InThreeSequence(singleBoardIndex, boardsResults)) {
            props.onMainBoardWin();
        } else if (!BoardUtils.havePossibleMoves(boardsResults)) {
            props.onMainBoardDraw();
        }
    }
    const singleBoardDrawHandler = (singleBoardIndex) => {
        boardsResults[singleBoardIndex] = 0;
        setActiveBoardIndex(singleBoardIndex);
        if (!BoardUtils.havePossibleMoves(boardsResults)) {
            props.onMainBoardDraw();
        }
    }
    const singleBoardTurnFinishedHandler = (selectedCell) => {
        props.onTurnFinished();
        // if this single board has result, enable all single boards
        let activeBoardIndex = boardsResults[selectedCell] === -1 ? selectedCell : -1;
        setActiveBoardIndex(activeBoardIndex);
    }
    return (<div className='main-board-grid'>
        {boardsResults.map((result, boardIndex) => (
                <SingleBoard onSingleBoardWin={() => singleBoardWinHandler(boardIndex)}
                             key={boardIndex}
                             newGame={props.newGame}
                             boardIsActive={boardsResults[boardIndex] === -1 &&
                             (activeBoardIndex === -1 || activeBoardIndex === boardIndex)}
                             onSingleBoardDraw={() => singleBoardDrawHandler(boardIndex)}
                             onTurnFinished={(selectedCell) => singleBoardTurnFinishedHandler(selectedCell)}
                             activePlayer={props.activePlayer}/>
            )
        )}

    </div>);
}
export default MainBoard;