import React, { useState } from "react"
import config from "../../config";
const InviteModal = (props) => {
	const { task } = props;
	const { id, title, notes, payload } = props.task;
	const { onCancle, onSaveChanges, onArchive } = props;
	let _initialState = {
		input:""
	}
	const [state,setState] = useState(_initialState)


	const handleOnChange = (event) => {
		setState({...state,input:event.target.value});
	}

	const handleOnInvite = () => {
		const input = state.input;
		//invite player to challenge
		//? ingame
		//fetch("/api/task/invite/"+state.input)
	}
	return(
	
	<div id={id+"-invite-modal"} className="modal">
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">{payload+"#"+id}</p>
      <button className="delete" aria-label="close" onClick={onCancle}></button>
    </header>
    <section className="modal-card-body">
		<input className="input" value={state.input} placeholder="Email" onChange={handleOnChange}/>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success" onClick={handleOnInvite}>Invite</button>
      <button className="button" onClick={onCancle}>Cancel</button>
	
	
    </footer>
  </div>
</div>

	);
}

export { InviteModal };
export default InviteModal;
