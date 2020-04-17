import React, { useState, useEffect } from "react"
import "bulma-checkradio/dist/css/bulma-checkradio.min.css";
const Modal = (props) => {
	const { task } = props;
	const { id, title, notes, payload } = props.task;
	const { onCancle, onSaveChanges, onDelete } = props;
	const isStreak = task.payload === "Streak" ? true : task.payload === "Challenge" ? true : false;
	const isPrivate = task.isPrivate === true ? true : false;
	let _initialValues = {
		title:title,
		notes:notes,
		isPrivate:isPrivate,
	}
	if(isStreak)_initialValues.streak = task.streak;

	const [values,setValues] = useState(_initialValues)


	const handleOnChangePrivacy = (event) => {
		setValues({...values,isPrivate:!values.isPrivate});
		}
	const handleOnChangeTitle = (event) => {
		setValues({...values,title:event.target.value});
	}
	const handleOnChangeNotes = (event) => {
		setValues({...values,notes:event.target.value});
	}
	const handleOnChangeStreak = (event) => {
		setValues({...values,streak:event.target.value})
	}
	const processValues = values => {
		let keys = Object.keys(values);
		let vals = Object.values(values);
		 
		for(let v in vals){
		  const parsed = parseInt(vals[v]);
			// eslint-disable-next-line
		  if(parsed === parsed){
		    values[keys[v]] = parsed;
		  }

		}
		return values;
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
		{isStreak && <input className="input" value={values.streak} onChange={handleOnChangeStreak}/> }
		<div className="field" onClick={handleOnChangePrivacy}>
  <input className="is-checkradio" id={id+"-privacy-checkbox"} type="checkbox" name="exampleCheckbox" checked={values.isPrivate} onChange={()=>{
  //
  }} />
  <label htmlFor="exampleCheckbox">Private</label>
</div>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-link" onClick={()=>{
	      const _values = processValues(values);
	      onSaveChanges({...task,..._values})
      }}>Save changes</button>
      <button className="button is-info" onClick={()=>{onDelete(id)}}>Delete</button>    
      <button className="button" onClick={onCancle}>Cancel</button>
	
    </footer>
  </div>
</div>

	);
}

export {Modal};
export default Modal;
