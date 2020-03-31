import React, { useState } from "react"

const Modal = (props) => {
	const { task } = props;
	const { id, title, notes, payload } = props.task;
	const { onCancle, onSaveChanges } = props;
	
	const [values,setValues] = useState({
		title:title,
		notes:notes});

	const handleOnChangeTitle = (event) => {
		setValues({...values,title:event.target.value});
	}
	const handleOnChangeNotes = (event) => {
		setValues({...values,notes:event.target.value});
	}
	return(
	
	<div id={id+"-modal"} className="modal">
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">{payload+"#"+id}</p>
      <button className="delete" aria-label="close" onClick={onCancle}></button>
    </header>
    <section className="modal-card-body">
		<input className="input" value={values.title} onChange={handleOnChangeTitle}/>
		<textarea className="textarea" value={values.notes} onChange={handleOnChangeNotes}></textarea>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success" onClick={()=>{onSaveChanges({...task,title:values.title,notes:values.notes})}}>Save changes</button>
      <button className="button" onClick={onCancle}>Cancel</button>
    </footer>
  </div>
</div>

	);
}

export {Modal};
export default Modal;
