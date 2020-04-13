import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import 'bulma-calendar/dist/css/bulma-calendar.min.css';

const CreateModal = (props) => {
  const { onAdd } = props;
  const initialState = {
    title:"",
    notes:"",
    payload: "Task"
  }
  const [state,setState] = useState(initialState);

	
  const handleOnClick = () => {
	  const setup = {...state}
	onAdd(setup);
	  setState(initialState);
  }

  const handleOnChangeTitle = (e) => {
    const {value} = e.target;
    setState({...state,title:value});
  }

  const handleOnChangeNotes = (e) => {
    const {value} = e.target;
    setState({...state,notes:value});
  }
 
  const handleOnChangePayload = (e) => {
    const { value } = e.target;
    setState({...state,payload:value});
  };
  const handleOnCancle = () => {
    const modals = document.querySelectorAll(".modal.is-active");
	  modals.forEach(m=>m.classList.remove("is-active"));
    const html = document.querySelector("html");
    html.classList.remove("is-clipped");
	  return;
  }


  React.useEffect(()=> {
var calendars = bulmaCalendar.attach('[type="date"]', {
	color: "danger",
	isRange: true,
	allowSameDayRange: false,
	showButtons: true,
	displayMode: "dialog",
	labelFrom:"From",
	labelTo:"To"

});
  calendars.forEach(calendar => {
    // Add listener to date:selected event
    calendar.on("date:selected", date => {
      console.log(date);
    });
  });

  // To access to bulmaCalendar instance of an element
  const element = document.querySelector("#date-picker");
  if (element) {
    // bulmaCalendar instance is available as element.bulmaCalendar
    element.bulmaCalendar.on("select", datepicker => {
      const datesStr = datepicker.data.value();
      const dates = datesStr.split(" - ");
      setState({...state,start:dates[0],end:dates[1]})
    });
  }
// eslint-disable-next-line
  },[state.payload])
  return (
    <div id={"create-modal"} className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create A Task</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleOnCancle}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="username"
                placeholder="Title"
	  	onChange={handleOnChangeTitle}
	  	value={state.title}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="check-square" />
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Notes"
	  	onChange={handleOnChangeNotes}
	  	value={state.notes}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <div className="select">
                <select onChange={handleOnChangePayload} value={state.payload}>
                  <option>Task</option>
                  <option>Habit</option>
                  <option>Daily</option>
                  <option>Streak</option>
                  <option>Goal</option>
                  <option>Dream</option>
                  <option>Challenge</option>
                </select>
                <span className="icon is-left">
                  <FontAwesomeIcon icon="filter" />
                </span>
              </div>
            </div>
          </div>
	  {state.payload === "Challenge" ? 	
          	<div className="field">
		      <input id="date-picker" type="date" />
              </div>
		  : ""
	  }

        </section>
        <footer className="modal-card-foot">
          <input type="submit" className="button is-success" onClick={handleOnClick}>
          </input>
          <button className="button is-warning" onClick={handleOnCancle}>Back</button>
        </footer>
      </div>
    </div>
  );
};

export default CreateModal;
