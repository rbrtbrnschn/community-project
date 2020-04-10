import React, { useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext"

const NewDayCheck = props => {
  
  const context = React.useContext(UserContext);	
  const {state} = context;
  const {player} = state;
  const { lastLogin, tasks } = player;

  const { onCancle, onCheckYesterday, isNewDay } = props; 
  const [checks,setChecks] = useState([]);
  
  useEffect(()=>{
	
  	const isNew = isNewDay();
  	//const isNew = true;
	if(isNew){
	  if(tasks.length === 0){
	    onCheckYesterday(checks);
	    return false;
	  }
	  const modal = document.getElementById("new-day-check");
	  modal.classList.add("is-active")
	  const html = document.querySelector("html");
	  html.classList.add("is-clipped")
	}
// eslint-disable-next-line
  },[lastLogin])

  const handleOnChange = (event) => {
	  const _checks = [...checks]
	const val = event.target.value;
	const isChecked = event.target.checked;
	  if(isChecked)_checks.push(val);
	  else{_checks.splice(_checks.indexOf(val),1)}
	  setChecks([..._checks])
  }

  const checkAlreadyCompleted = (task) => {
	if(task.payload === "Task")return false;
	const lastStamp = task.timestamps[task.timestamps.length - 1];
	const {key, payload, isComplete} = lastStamp;
	const lastDay = new Date(key);
	const lastDate = lastDay.getDate();
	const toDay = new Date();
	const toDate = toDay.getDate();
	const yesterDate = toDate - 1;
	if(lastDate === yesterDate && isComplete || yesterDate && payload === "onFail" )return false;
	if(lastDate !== toDate)return true;
  }

  return (
    <div className="modal" id="new-day-check">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button className="delete" aria-label="close" onClick={()=>{onCheckYesterday(checks)}}></button>
        </header>
        <section className="modal-card-body">
          <h2 className="title is-3">What Have You Done Yesterday?</h2>
	  {tasks.map(t=> checkAlreadyCompleted(t) && (
	  <div key={t.id+"new-day-check"}>
		  <label className="checkbox">
		    <input value={t.id} onChange={handleOnChange} type="checkbox" />
		    {" "+ t.title}
		  </label>
	  </div>
	  ))
	  }
        </section>
        <footer className="modal-card-foot">
          <button id="submit-button" className="button is-success" onClick={()=>{onCheckYesterday(checks)}}>Done</button>
        </footer>
      </div>
    </div>
  );
};

export default NewDayCheck;
export { NewDayCheck };
