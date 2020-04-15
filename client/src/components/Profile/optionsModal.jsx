import React from "react";

const OptionsModal = props => {
	const { task } = props;

	const handleOnCancle = () => {
		const modal = document.querySelector("#options-modal");
		modal.classList.remove("is-active")
	}
	return(
		<div id="options-modal" className="modal">
  		<div className="modal-background"></div>
  		<div className="modal-card">
    		<header className="modal-card-head">
      		<p className="modal-card-title">WIP</p>
      		<button className="delete" aria-label="close"
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
export default OptionsModal;
