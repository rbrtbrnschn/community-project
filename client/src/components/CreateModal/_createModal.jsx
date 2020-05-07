import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagsInput from "../tagsInput";
import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min.js";
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import AddOn from "./addon";
const CreateModal = (props) => {
  const { onAdd, className, onCancle } = props;
  const initialState = {
    title: "",
    notes: "",
    payload: "Task",
    interval: 1,
    tags: [],
  };
  const [state, setState] = useState(initialState);

  const handleOnClick = () => {
    const setup = { ...state };
    if (setup.start && setup.end) {
      setup.start = new Date(setup.start).getTime();
      setup.end = new Date(setup.end).getTime();
    }
    console.log("props:", props);
    onAdd(setup);
    setState(initialState);
  };

  const handleOnChangeTitle = (e) => {
    const { value } = e.target;
    setState({ ...state, title: value });
  };

  const handleOnChangeNotes = (e) => {
    const { value } = e.target;
    setState({ ...state, notes: value });
  };

  const handleOnChangePayload = (e) => {
    const { value } = e.target;
    setState({ ...state, payload: value });
  };

  const handleOnChangeInterval = (e) => {
    const { value } = e.target;
    const parsed = parseInt(value);
    console.log(parsed);
    if (parsed === parsed) {
      setState({ ...state, interval: parsed });
    }
  };

  const handleOnCancle = () => {
    if (onCancle) {
      onCancle();
      console.log("ran it");
    }
    const modals = document.querySelectorAll(".modal.is-active");
    modals.forEach((m) => m.classList.remove("is-active"));
    const html = document.querySelector("html");
    html.classList.remove("is-clipped");
    return;
  };

  // ! Tags
  const tagsOnKeyDown = (e) => {
    const { value } = e.target;
    const code = e.keyCode;
    const valid = [13, 32, 188];
    const backspace = 8;
    if (value === " ") {
      e.target.value = "";
      return;
    }
    if (valid.includes(code) && value) {
      // * Key Code Is Valid
      setState({ ...state, tags: [...state.tags, value.toLowerCase().trim()] });
      // * Add Tag / Reset Input
      e.target.value = "";
    }
  };
  const tagsOnBackspace = (e) => {
    const { value } = e.target;
    const code = e.keyCode;
    if (!value && code === 8) {
      const _tags = [...state.tags];
      _tags.pop();
      setState({ ...state, tags: _tags });
    }
  };
  const tagsOnDelete = (i) => {
    const _tags = [...state.tags];
    _tags.splice(i, 1);
    setState({ ...state, tags: _tags });
  };

  React.useEffect(() => {
    if (state.payload === "Challenge") {
      var calendars = bulmaCalendar.attach('[type="date"]', {
        color: "danger",
        isRange: true,
        allowSameDayRange: false,
        showButtons: true,
        displayMode: "dialog",
        labelFrom: "From",
        labelTo: "To",
      });
      calendars.forEach((calendar) => {
        // Add listener to date:selected event
        calendar.on("date:selected", (date) => {
          console.log(date);
        });
      });

      // To access to bulmaCalendar instance of an element
      const element = document.querySelector("#date-picker");
      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on("select", (datepicker) => {
          const datesStr = datepicker.data.value();
          const dates = datesStr.split(" - ");
          const start = new Date(dates[0]).getTime();
          const end = new Date(dates[1]).getTime();
          console.log(start, end, dates);
          setState({ ...state, start: start, end: end });
        });
      }
    }
    // eslint-disable-next-line
  }, [state]);
  return (
    <div id={"create-modal"} className={className || "modal"}>
      <div className="modal-background" onClick={handleOnCancle}></div>
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

          <AddOn
            helpers={{
              onChangeInterval: handleOnChangeInterval,
              onChangeDate: null,
            }}
            task={state}
          />
          <hr />
          <TagsInput
            color="is-link"
            size="is-medium"
            tags={state.tags}
            onKeyDown={tagsOnKeyDown}
            onDelete={tagsOnDelete}
            onBackspace={tagsOnBackspace}
          />
        </section>
        <footer className="modal-card-foot">
          <input
            type="submit"
            className="button is-link"
            onClick={handleOnClick}
          ></input>
          <button className="button is-info" onClick={handleOnCancle}>
            Back
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateModal;
