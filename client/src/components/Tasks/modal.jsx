import React, { useState } from "react"

const Modal = (props) => {
	const { task } = props;
	const { id, title, notes, payload } = props.task;
	const { onCancle, onSaveChanges, onArchive } = props;
	const isStreak = task.payload === "Streak";
	let _initialValues = {
		title:title,
		notes:notes,
	}
	if(isStreak)_initialValues.streak = task.streak;
	const [values,setValues] = useState(_initialValues)


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
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success" onClick={()=>{
	      const _values = processValues(values);
	      onSaveChanges({...task,..._values})
      }}>Save changes</button>
      <button className="button is-warning" onClick={()=>{onArchive(id)}}>Archive</button>    
      <button className="button" onClick={onCancle}>Cancel</button>
	
	
    </footer>
  </div>
</div>

	);
}

export {Modal};
export default Modal;
