import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Description from "./description";
const AddOn = (props) => {
  const { helpers, task } = props;
  const { getTags } = helpers;
  const { payload } = task;

  let div = <div></div>;

  const inputInterval = (
    <div className="field has-addons ">
      <div className="control has-icons-left">
        <input
          className="input"
          placeholder="interval"
          onChange={helpers.onChangeInterval}
        ></input>
        <span className="icon is-left">
          <FontAwesomeIcon icon="redo" />
        </span>
      </div>
      <div className="control">
        <button className="button is-link">per week</button>
      </div>
    </div>
  );

  switch (payload) {
    case "Task":
      div = (
        <div>
          <hr />
          <Description
            title={!task.title ? task.payload : task.title}
            sub={`A basic task, either you complete it or you fail it.`}
          />
        </div>
      );
      break;
    case "Daily":
      div = (
        <div>
          <hr />
          <Description
            title={!task.title ? task.payload : task.title}
            sub={"A task, which reoccurs daily - interval of one."}
          />
        </div>
      );
      break;
    case "Streak":
      div = (
        <div className="total">
          {inputInterval}
          <hr />
          <Description
            title={!task.title ? task.payload : task.title}
            sub={`Reacurring every ${task.interval} days. Keeps track of your streak count.`}
          />
        </div>
      );
      break;
    case "Habit":
      div = (
        <div>
          <hr />
          <Description
            title={!task.title ? task.payload : task.title}
            sub={
              "Something you do quite often each day - eg.physical activity."
            }
          />
        </div>
      );
      break;
    case "Challenge":
      const start = task.start
        ? new Date(task.start).toLocaleDateString()
        : " one day";
      const end = task.end
        ? new Date(task.end).toLocaleDateString()
        : " another day";
      div = (
        <div className="total">
          {inputInterval}
          <div className="field">
            <input id="date-picker" type="date" />
          </div>
          <hr />
          <Description
            title={!task.title ? task.payload : task.title}
            sub={`A Task you do every ${task.interval} days. You begin ${start} and end on ${end}.
            Invite friends or open to public for anyone to join.`}
          />
        </div>
      );
      break;
    case "Goal":
      div = (
        <div>
          <hr />
          <Description
            title={!task.title ? task.payload : task.title}
            sub={"Need I tell you what a goal is, seriously?"}
          />
        </div>
      );
      break;
    case "Dream":
      div = (
        <div>
          <hr />
          <Description
            title={!task.title ? task.payload : task.title}
            sub={"I have a dream, that one day - memes will be funny again."}
          />
        </div>
      );
      break;

    default:
      break;
  }

  return div;
};
export default AddOn;
