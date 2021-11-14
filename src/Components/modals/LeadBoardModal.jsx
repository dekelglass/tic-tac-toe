import Modal from "react-modal";
import './LeadBoardModal.css';

const LeadBoardModal = (props) => {
    return (
        <Modal ariaHideApp={false} className="leadBoard-modal" isOpen={props.isOpen}>
            <h1 className="header">HIGH SCORES</h1>
            <div className="sub-header">
                <span>PLAYER</span>
                <span>MOVES</span>
            </div>
            <ul className="scores-list">
                {props.scores.map((score, index) => (
                    <li className="score-item" key={index}>
                        <span>{`${score.winner}`}</span>
                        <span>{score.moves}</span>
                    </li>
                ))}
            </ul>
            <button className="close-button" onClick={props.onCloseLeadBoard}>CLOSE
            </button>
        </Modal>);
}
export default LeadBoardModal;
