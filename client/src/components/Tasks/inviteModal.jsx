import React, { useState } from "react"
import config from "../../config";
const InviteModal = (props) => {
	const { task } = props;
	const { id, title, notes, payload } = props.task;
	const { onCancle, onSaveChanges, onArchive } = props;
	let _initialState = {
		input:"",
		err:false,
		errMsg:""
	}
	const [state,setState] = useState(_initialState)


	const handleOnChange = (event) => {
		setState({...state,input:event.target.value});
	}

	const handleOnInvite = task => {
		const input = state.input;
		console.log("input:",input)
		//invite player to challenge
		const options = {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(task)
		}
		fetch("/api/challenge/invite/"+state.input,options)
		.then(res=>res.json())
		.then(docs=>{
			if(docs.ok){
				setState({input:"",err:true,errMsg:"Invite Sent."});
				setTimeout(()=>{
					console.log(docs)
				onCancle();
				},300)
			}
			else{
			setState({...state,err:true,errMsg:"User Doesn't Exist."})
			}
		});
	}
	return(
	
	<div id={id+"-invite-modal"} className="modal">
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">{
	      !state.err ?
	      payload+"#"+id :
	      state.errMsg
      }</p>
      <button className="delete" aria-label="close" onClick={onCancle}></button>
    </header>
    <section className="modal-card-body">
		<input className="input" value={state.input} placeholder="Email" onChange={handleOnChange}/>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success" onClick={()=>{handleOnInvite(task)}}>Invite</button>
      <button className="button" onClick={onCancle}>Cancel</button>
	
	
    </footer>
  </div>
</div>

	);
}

export { InviteModal };
export default InviteModal;
