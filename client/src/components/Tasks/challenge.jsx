import React from "react";
import {Modal} from "./modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faCheck} from "@fortawesome/free-solid-svg-icons"
import InviteModal from "./inviteModal";
const ChallengeComponent = (props) => {
	const { all } = props;
	const { task, onDelete, onComplete, onEdit, onCancle, onSaveChanges, onArchive, onFail } = all;

        return(<div className="task">
                <div className="card" id={task.id}>
                <div className="card-content" onClick={onEdit}>     
                <p className="title is-3">{task.title}</p>
                <p className="subtitle">{task.notes}</p>
                <p className="tag is-primary is-success is-rounded is-light is-large">{task.streak}</p>
                </div>

                <footer className="card-footer">
                <p className="card-footer-item">
                <button className="button is-success"
                        onClick={onComplete}
                >
                <span className="icon is-small">
                 <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span>Complete</span>
                 </button>
                </p>
                <p className="card-footer-item">
                <button className="button is-danger"
                        onClick={onFail}
                >
                  <span>Fail</span>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </button>
                </p>
                <p className="card-footer-item">
                <button className="button is-primary"
                        onClick={()=>{
			const modal = document.getElementById(`${task.id}-invite-modal`);
				const html = document.querySelector("html");
				modal.classList.add("is-active");
				html.classList.add("is-clipped");
			}}
                >
                  <span>Invite</span>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="user" />
                  </span>
                </button>
                </p>
                </footer>
                </div>
                <Modal task={task} onCancle={onCancle} onSaveChanges={onSaveChanges} onArchive={onArchive} />
		<InviteModal task={task} onCancle={onCancle}/>

        </div>)

}
export default ChallengeComponent;
