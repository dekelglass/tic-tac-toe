import "./App.css";
import Toolbar from "./Components/Toolbar";
import * as Constants from "./Components/Constants";
import {useEffect, useState} from "react";
import MainBoard from "./Components/GameBoard/MainBoard";
import LeadBoardModal from "./Components/modals/LeadBoardModal";
import AddNewScoreModal from "./Components/modals/AddNewScoreModal";
import EndWIthDrawModal from "./Components/modals/EndWIthDrawModal";

const INITIAL_ACTIVE_PLAYER = Constants.FIRST_PLAYER;
const INITIAL_SCORES = [];

function App() {
    const [activePlayer, setActivePlayer] = useState(INITIAL_ACTIVE_PLAYER);
    const [showFinishedWithDraw, setShowFinishedWithDraw] = useState(false);
    const [showLeadBoard, setShowLeadBoard] = useState(false);
    const [numberOfTurns, setNumberOfTurns] = useState(0);
    const [showAddNewScore, setShowAddNewScore] = useState(false);
    const [newGame, setNewGame] = useState(false);
    const [scores, setScores] = useState(INITIAL_SCORES);
    const [gameOver, setGameOver] = useState(false);// needed to disable all remaining boards after win

    //get scores from session storage in case of browser refresh
    useEffect(() => {
        const scoresFromSession = sessionStorage.getItem('scores');
        let updatedScores = JSON.parse(scoresFromSession);
        updatedScores = updatedScores !== null ? updatedScores : INITIAL_SCORES;
        setScores(updatedScores);
    }, [])

    const turnFinishedHandler = () => {
        const newActivePlayer =
            activePlayer === Constants.FIRST_PLAYER
                ? Constants.SECOND_PLAYER
                : Constants.FIRST_PLAYER;

        setActivePlayer(newActivePlayer);
        setNumberOfTurns((prevNumber) => prevNumber + 1);
    };

    const mainBoardWinHandler = () => {
        setShowAddNewScore(true);
        setGameOver(true);
    }
    const mainBoardDrawHandler = () => {
        setShowFinishedWithDraw(true);
    }
    const openLeadBoardHandler = () => {
        setShowLeadBoard(true)
    }
    const addScoreHandler = (winnerName) => {
        setScores(prevValue =>
            [...prevValue, {winner: winnerName, moves: Math.ceil(numberOfTurns / 2)}]);
        setShowAddNewScore(false);
    }

    //update session storage with scores after app is rendered
    useEffect(() => {
        sessionStorage.setItem('scores', JSON.stringify(scores));
    }, [scores]);

    const newGameHandler = () => {
        setNewGame(true);
        initState();
    }
    const initState = () => {
        setActivePlayer(INITIAL_ACTIVE_PLAYER);
        setNumberOfTurns(0);
        setGameOver(false);
        setShowFinishedWithDraw(false);
    };

    useEffect(() => {
        if (newGame) {
            setNewGame(false);
        }
    }, [newGame])
    return (
        <div className="game-container">
            <Toolbar activePlayer={activePlayer} onNewGame={newGameHandler} onOpenLeadBoard={openLeadBoardHandler}/>
            <MainBoard
                newGame={newGame}
                gameOver={gameOver}
                onTurnFinished={turnFinishedHandler}
                activePlayer={activePlayer}
                onMainBoardWin={mainBoardWinHandler}
                onMainBoardDraw={mainBoardDrawHandler}
            />
            <LeadBoardModal
                onCloseLeadBoard={() => {
                    setShowLeadBoard(false)
                }}
                scores={scores} isOpen={showLeadBoard}/>
            <AddNewScoreModal onAddScoreBoard={addScoreHandler} isOpen={showAddNewScore}/>
            <EndWIthDrawModal
                onCloseEndWithDraw={() => {
                    setShowFinishedWithDraw(false)
                }}
                isOpen={showFinishedWithDraw}/>
        </div>
    );
}

export default App;

