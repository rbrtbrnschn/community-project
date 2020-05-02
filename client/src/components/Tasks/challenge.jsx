import React from "react";
import {Modal} from "./modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faCheck} from "@fortawesome/free-solid-svg-icons"
import InviteModal from "./inviteModal";
import config from "../../config";
const {uri} = config;
const ChallengeComponent = (props) => {
	const { all } = props;
	const { task, onDelete, onComplete, onEdit, onCancle, onSaveChanges, onArchive, onFail, onStreakColor, onCompleteColor, onFailColor, switchForPayload } = all;
	const handleOnComplete = (task) => {
		console.log(task.title, "| archiving...");
		setTimeout(()=>{
			//TODO insert actual archive url here

			fetch(`${uri.domain}/api/test/secret`)
			.then(res =>{
				if(res.ok){
					onDelete(task);
				}
			})
		},3000)

	}
	const handleOnStartInDays = (task) => {
		task = switchForPayload(task);
		const start = new Date(task.start);
		const today = new Date();
		const startingInDays = task._daysBetween(today,start);
		return startingInDays;
	}
        return(<div className="task">
                <div className="card" id={task.id}>
                <div className="card-content" onClick={onEdit}>     
                <p className="title is-3">{task.title}</p>
                <p className="subtitle">{task.notes}</p>
                <p className={"tag is-link is-rounded is-large "+onStreakColor(task)}>{task.streak}</p>
                </div>

		{task.isOngoing ?
                <footer className="card-footer">
                <p className="card-footer-item">
                <button className={"button is-link"+onCompleteColor(task)}
                        onClick={onComplete}
                >
                <span className="icon is-small">
                 <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span>Complete</span>
                 </button>
                </p>
                <p className="card-footer-item">
                <button className={"button is-info"+onFailColor(task)}
                        onClick={onFail}
                >
                  <span>Fail</span>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </button>
                </p>
                <p className="card-footer-item">
                <button className="button is-primary is-outlined"
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
			: !task.isOngoing && Date.now() > task.end ? <footer className="card-footer">
			<p className="card-footer-item" >
			<button className="button is-danger"
			onClick={handleOnComplete(task)}

			>Archiving...</button>
			</p>
			</footer> : !task.isOngoing && Date.now() < task.start ? <footer className="card-footer">
				<p className="card-footer-item">
					<button className="button is-info is-outlined">Starting in {handleOnStartInDays(task)} days</button>
				</p>
			</footer> : ""}
                </div>
                <Modal task={task} onCancle={onCancle} onSaveChanges={onSaveChanges} onArchive={onArchive} onDelete={onDelete} />
		<InviteModal task={task} onCancle={onCancle}/>

        </div>)

}
export default ChallengeComponent;
