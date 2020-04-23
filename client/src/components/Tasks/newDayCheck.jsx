import React, { useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";

const NewDayCheck = (props) => {
  const context = React.useContext(UserContext);
  const { switchForPayload } = props;
  const { state } = context;
  const { player } = state;
  const { lastLogin, tasks } = player;

  const { onCheckYesterday, isNewDay } = props;
  const [checks, setChecks] = useState([]);

  useEffect(() => {
    const isNew = isNewDay();
    if (isNew) {
      //const checksDiv = document.getElementById("checks");

      let needCheck = false;
      tasks.forEach((t) => {
        if (!needCheck) {
          const isNeeded = switchForPayload(t)._needCheck();
          needCheck = isNeeded;
        } else {
        }
      });

      //* If No Check Is Necessary
      if (!needCheck) {
        return onCheckYesterday(checks);
      }

      // * If No Tasks
      if (tasks.length === 0) {
        return onCheckYesterday(checks);
      }
      const modal = document.getElementById("new-day-check");
      modal.classList.add("is-active");
      const html = document.querySelector("html");
      html.classList.add("is-clipped");
    }
    // eslint-disable-next-line
  }, [lastLogin]);

  const handleOnChange = (event) => {
    const _checks = [...checks];
    const val = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) _checks.push(val);
    else {
      _checks.splice(_checks.indexOf(val), 1);
    }
    setChecks([..._checks]);
  };

  return (
    <div className="modal" id="new-day-check">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="title"></p>
          <p className="modal-card-title">Welcome Back!</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              onCheckYesterday(checks);
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <h2 className="title is-3">What Have You Done Yesterday?</h2>
          <div id="checks">
            {tasks.map(
              (t) =>
                switchForPayload(t)._needCheck() && (
                  <div key={t.id + "new-day-check"}>
                    <label className="checkbox">
                      <input
                        value={t.id}
                        onChange={handleOnChange}
                        type="checkbox"
                      />
                      {" " + t.title}
                    </label>
                  </div>
                )
            )}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            id="submit-button"
            className="button is-success"
            onClick={() => {
              onCheckYesterday(checks);
            }}
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewDayCheck;
export { NewDayCheck };
