import Modal from "react-modal";
import './AddNewScoreModal.css';
import {BsFillTrophyFill} from "react-icons/all";

const AddNewScoreModal = (props) => {
    let name = '';

    const inputValueChanged = (event) => {
        name = event.target.value;
    }
    const onAddHandler = () => {
        props.onAddScoreBoard(name);
    }
    return (
        <Modal ariaHideApp={false} className="add-new-score-modal" isOpen={props.isOpen}>
            <h1 className="header">WELL DONE!</h1>
            <div className="icon-container"><BsFillTrophyFill/></div>
            <div className="sub-header">
                <span>Please enter your name to leaderboard:</span>
            </div>
            <input onChange={inputValueChanged} className="name-input" type="text"/>
            <button className="add-button" onClick={onAddHandler}>ADD SCORE
            </button>
        </Modal>
    );
}
export default AddNewScoreModal;