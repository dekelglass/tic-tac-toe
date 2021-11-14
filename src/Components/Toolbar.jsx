import "./Toolbar.css";

const Toolbar = (props) => {
    const openLeadBoardHandler = () => {
        props.onOpenLeadBoard();
    }
    const newGamedHandler = () => {
        props.onNewGame();
    }

    return (
        <div className="toolbar">
            <div className="toolbar-buttons">
                <button className="new-game-button" onClick={newGamedHandler}>Start New Game</button>
                <button className="show-leadboard-button" onClick={openLeadBoardHandler}>Leadboard</button>
            </div>
            <span className={'active-player-label'}>{'Current Player: ' + props.activePlayer}</span>
        </div>
    );
};

export default Toolbar;
