import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateTask = props => {
  const titleRef = useRef();
  const notesRef = useRef();
  let type = "Task";

  const handleOnClick = async() => {
    const title = titleRef.current.value;
    const notes = notesRef.current.value;
    const body = {title:title,notes:notes,payload:type}
    
    const url = "http://localhost:3000/api/task/new"
    const options = {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(body)
    }
    const response = await fetch(url,options);
    const data = await response.json();
    console.log("data:",data) 
  };
  const handleOnChange = (e) => {
  	const {name,value} = e.target;
	type = value;
  }
  return (
    <div>
      <div className="columns">
        <div className="column is-third"></div>
        <div className="column is-third">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="username"
                placeholder="Title"
                ref={titleRef}
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
                ref={notesRef}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <div className="select">
	      <select onChange={handleOnChange}>
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

          <input
            type="submit"
            className="button is-danger"
            onClick={handleOnClick}
          />
	  <p></p>
	  <button onClick={()=>{window.location = "/tasks"}} className="button is-danger is-inverted">Back To Tasks</button>
        </div>
        <div className="column is-third">
	  </div>
      </div>
    </div>
  );
};

export default CreateTask;
