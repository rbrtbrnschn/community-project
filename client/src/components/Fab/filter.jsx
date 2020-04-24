import React, { useState } from "react";
import Description from "./description";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filter = (props) => {
  const { onCancle, onFilter } = props;

  const [state, setState] = useState({ payload: "All" });

  const handleFilterColor = (i) => {
    const one = "is-info";
    const two = "is-link";
    const three = "is-white";

    const ex = i % 2;
    return ex === 0 ? three : ex === 1 ? two : "";
    //return i % 3 === 0 ? three : i % 3 === 1 ? two : i % 3 === 2 ? one : "";
  };
  return (
    <div className="modal is-active" id="search-modal">
      <div className="modal-background" onClick={onCancle}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Filter Tasks</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancle}
          ></button>
        </header>
        <section className="modal-card-body">
          {[
            "All",
            "Task",
            "Daily",
            "Streak",
            "Habit",
            "Challenge",
            "Goal",
            "Dream",
          ].map((t, i) => {
            return (
              <Description
                key={t + i}
                title={t}
                size="is-small"
                color={handleFilterColor(i)}
                onClick={() => {
                  onCancle();
                  onFilter(t);
                }}
              />
            );
          })}
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};

export default Filter;
