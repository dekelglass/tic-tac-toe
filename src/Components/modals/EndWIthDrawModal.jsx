import Modal from "react-modal";
import './EndWIthDrawModal.css';

const EndWIthDrawModal = (props) => {
    return (
        <Modal className="end-with-draw-modal" isOpen={props.isOpen}>
            <div className="message-container">
                THE GAME ENDED WITH DRAW!<br/> START A NEW GAME
            </div>
            <button className="ok-button" onClick={()=>{props.onCloseEndWithDraw()}}>OK
            </button>
        </Modal>
    )
}

export default EndWIthDrawModal;