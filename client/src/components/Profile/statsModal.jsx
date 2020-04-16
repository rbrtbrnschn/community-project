import React from "react";

const StatsModal = props => {
	const { task } = props;

	const handleOnCancle = e => {
		const { currentTarget } = e;
		const { id } = currentTarget;
		const _id = id.split("-")[0]+"-stats-modal"
		const modal = document.getElementById(_id);
		modal.classList.remove("is-active")
	}

	return(
		<div id={task.id+"-stats-modal"} className="modal">
  		<div id={task.id+"-stats-modal-background"} className="modal-background" onClick={handleOnCancle}></div>
  		<div className="modal-card">
    		<header className="modal-card-head">
      		<p className="modal-card-title">Options</p>
      		<button id={task.id+"-stats-modal-button"} className="delete" aria-label="close"
		onClick={handleOnCancle}
		></button>
    		</header>
    		<section className="modal-card-body">
		<p className="title is-3">{task.title}</p>
    		</section>
    		<footer className="modal-card-foot">
      		<button className="button is-success"
		onClick={handleOnCancle}
		>Useless</button>
      		<button className="button"
		onClick={handleOnCancle}
		>Cancel</button>
    		</footer>
  		</div>
		</div>
	);
}
export default StatsModal;

