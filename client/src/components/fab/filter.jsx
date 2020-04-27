import React from "react";
import Tags from "./tags";

const Filter = (props) => {
  const { onCancle, onFilter } = props;

  return (
    <div className="modal is-active" id="filter-modal">
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
          <Tags
            payloads={[
              "Task",
              "Daily",
              "Streak",
              "Habit",
              "Challenge",
              "Goal",
              "Dream",
            ]}
            tags={["due", "uninitiated"]} //due
            onFilter={onFilter}
          />
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};

export default Filter;
