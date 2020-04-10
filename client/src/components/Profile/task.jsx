import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
const Task = (props) => {
	const { task } = props;

	const lastCompleted = (task) => {
	  const { timestamps } = task;
	  let newest = 0;
	  timestamps.forEach(t=>{
	  if(t.key > newest && t.payload === "onComplete"){
		  newest = t.key;
	  }
	  })
	  if(newest === 0)return "Incomplete.";
	  const latestDate = new Date(newest);
	  return latestDate.toLocaleDateString();
	}
	return (<div className="container is-fullwidth">
                <div className="card" id={task.id}>
                <div className="card-content">     
                <p className="title is-3">{task.title}</p>
                <p className="subtitle">{task.notes}</p>
                </div>

                <footer className="card-footer">
                <p className="card-footer-item">
                <button className="button is-link"
                        
                >
                <span className="icon is-small">
                 <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span>{new Date(task.timestamps[0].key).toLocaleDateString()}</span>
                 </button>
                </p>
                <p className="card-footer-item">
		<button className="button is-info">  
		<span className="icon is-small">
		<FontAwesomeIcon icon={faCheckDouble} />
		</span>
		<span>{lastCompleted(task)} </span>
		  </button>
                </p>
                </footer>
                </div>

        </div>)

}

export default Task;
