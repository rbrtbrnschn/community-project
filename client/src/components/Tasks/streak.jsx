import React from "react";
import { Modal } from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { cpus } from "os";
const Streak = (props) => {
  const { all } = props;
  const {
    task,
    onDelete,
    onComplete,
    onEdit,
    onCancle,
    onSaveChanges,
    onArchive,
    onFail,
    onStreakColor
  } = all;

  const handleStreakColor = (task) => {
    	const s = task.streak;
    	let color = "is-link";
	if(s<0)color = "is-danger"
	else if(s === 0){}
	else if(s > 0 && s < 5)color = "is-primary"
	else if(s >= 10){color = "is-success"}
	  console.log(color)
    	return color;
  };
  return (
    <div className="task">
      <div className="card" id={task.id}>
        <div className="card-content" onClick={onEdit}>
          <p className="title is-3">{task.title}</p>
          <p className="subtitle">{task.notes}</p>
          <p className={"tag is-rounded is-large " + onStreakColor(task)}>
            {task.streak}
          </p>
        </div>

        <footer className="card-footer">
          <p className="card-footer-item">
            <button className="button is-link is-outlined" onClick={onComplete}>
              <span className="icon is-small">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span>Complete</span>
            </button>
          </p>
          <p className="card-footer-item">
            <button className="button is-info is-outlined" onClick={onFail}>
              <span> Fail </span>
              <span className="icon is-small">
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </button>
          </p>
        </footer>
      </div>
      <Modal
        task={task}
        onCancle={onCancle}
        onSaveChanges={onSaveChanges}
        onArchive={onArchive}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Streak;
