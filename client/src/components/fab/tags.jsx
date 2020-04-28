import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTag, faTags } from "@fortawesome/free-solid-svg-icons";
const PayloadTags = (props) => {
  // * Props && Necessary Precautions
  let { payloads, tags, color, size, onFilter } = props;
  if (!payloads) payloads = [];
  if (!tags) tags = [];
  if (!color) color = "is-danger";
  if (!size) size = "is-medium";

  // * Saves Last Session To lastSession
  let lastSession;
  const storedFilteredTags = window.localStorage.getItem("filteredTags");
  const parsedFilteredTags = storedFilteredTags
    ? JSON.parse(storedFilteredTags)
    : null;
  if (parsedFilteredTags && parsedFilteredTags.ok) {
    lastSession = { ...parsedFilteredTags };
  }

  // * Initialize State
  const initialState = { payloads: [], tags: [] };
  payloads.forEach((p, i) => {
    initialState.payloads.push({ value: p, isSelected: true });
  });
  tags.forEach((t, i) => {
    initialState.tags.push({ value: t, isSelected: false, isImmutable: true });
  });
  // * Use Either lastSession Or initialState Depending On Availability
  const _state = lastSession ? lastSession : initialState; // use last session if available
  const [state, setState] = useState(_state);
  const usedSession =
    state === lastSession ? true : state === initialState ? false : null;
  console.log("usedSession:", usedSession);
  console.log("lastsession:", lastSession);

  // * State Listener Handles onChange
  useEffect(() => {
    // * Dissalows Running OnMount
    if (!state.ok) return;

    // * Gets All Selected Tags
    const selectedPayloads = state.payloads.map((p) =>
      p.isSelected ? p.value : null
    );
    const mutableTags = state.tags.map((t) => (t.isSelected ? t.value : null));
    mutableTags.splice(0, tags.length);
    const immutableTags = state.tags.slice(0, tags.length);

    // * Sets LocalStorage To Last Session
    window.localStorage.setItem("filteredTags", JSON.stringify(state));

    // * Sets Filter Method For tasks.jsx
    onFilter((task) => {
      let judge = [];
      // * true When >= 1 Tag Matches
      if (task.tags) {
        if (mutableTags.length === 0) judge.push(true);
        else if (task.tags.some((t) => mutableTags.indexOf(t) >= 0)) {
          judge.push(true);
          //return true;
        } else {
          judge.push(false);
        }
      }

      // * true When Payload Is Included In selectedPayloads
      if (selectedPayloads.includes(task.payload)) {
        judge.push(true);
        //return true;
      } else {
        judge.push(false);
      }

      // * Handle Immutable Tags
      if (immutableTags) {
        let boolArr = [];
        immutableTags.forEach((t) => {
          boolArr.push(handleImmutableTags(task, t));
        });
        //console.log(boolArr.every((b) => b === true));
        judge.push(boolArr.every((b) => b === true));
      }

      // * None Of The Above Yields false
      // TODO
      // ? IDEA Depending On Settings Filter For And / Or Tags
      if (judge.length === 0) return false;
      return judge.every((b) => b === true);
      //return false;
    });
  }, [state]);

  // *
  const handleImmutableTags = (task, tag) => {
    let boo = true;
    switch (tag.value) {
      case "due":
        boo = handleTagDue(task, tag);
        break;
      case "uninitiated":
        boo = handleTagUninitiated(task, tag);
        break;

      default:
        break;
    }

    return boo;
  };
  const handleTagDue = (task, tag) => {
    const invalid = ["Task", "Habit", "Goal", "Dream"];
    if (tag.isSelected) {
      if (!invalid.includes(task.payload)) {
        if (!task.isComplete) return true;
        else return false;
      } else return false;
    } else return true;
  };
  const handleTagUninitiated = (task, tag) => {
    const valid = "Challenge";
    if (tag.isSelected) {
      if (valid === task.payload) {
        if (!task.isOngoing) return true;
        else return false;
      } else return false;
    } else return true;
  };
  // ! Custom Tag Helpers
  const handleAddTag = (v) => {
    const _state = { ...state };
    const { tags } = _state;
    tags.push({ value: v, isSelected: true, isImmutable: false });
    _state.ok = true;
    setState(_state);
  };
  const handleDeleteLastTag = () => {
    const _state = { ...state };
    const { tags } = _state;
    if (tags.length === 0) return;
    if (tags[tags.length - 1].isImmutable) return;
    tags.pop();
    _state.ok = true;
    setState(_state);
  };
  const handleOnKeyUp = (e) => {
    const { keyCode } = e;
    let { value } = e.target;
    value = value.toLowerCase().trim();
    if (!value) return;
    switch (keyCode) {
      case 13:
        e.target.value = "";
        handleAddTag(value);
        break;
      case 32:
        e.target.value = "";
        handleAddTag(value);
        break;
      default:
        break;
    }
  };
  const handleOnBackSpace = (e) => {
    const { keyCode } = e;
    const { value } = e.target;
    if (keyCode === 8 && value.trim() === "") {
      handleDeleteLastTag();
    }
  };
  const handleOnDeleteTag = (i) => {
    const _state = { ...state };
    const { tags } = _state;
    tags.splice(i, 1);
    _state.ok = true;
    setState(_state);
  };
  return (
    <div id="tags">
      <div className="field is-grouped is-grouped-multiline">
        {state.payloads.map((p, i) => (
          <div
            className="control"
            onClick={() => {
              let newState = { ...state };
              newState.payloads[i].isSelected = !newState.payloads[i]
                .isSelected;
              setState({ ...newState, ok: true });
            }}
            key={p.value + i}
          >
            <div className={`tags has-addons `} style={{ cursor: "pointer" }}>
              <div
                className={`tag ${!p.isSelected ? color : "is-info"} ${size}`}
              >
                {p.value}
              </div>
              <div className={`tag ${size}`}>
                <span className={`icon is-small`}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="field is-grouped is-grouped-multiline">
        {state.tags.map((t, i) => {
          return t.isImmutable ? (
            <div
              className="control"
              onClick={() => {
                let newState = { ...state };
                newState.tags[i].isSelected = !newState.tags[i].isSelected;
                setState({ ...newState, ok: true });
              }}
              key={t.value + i}
            >
              <div
                className={`tags has-addons is-capitalized`}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`tag ${!t.isSelected ? color : "is-info"} ${size}`}
                >
                  {t.value}
                </div>
                <div className={`tag ${size} `}>
                  <span className={`icon is-small`}>
                    <FontAwesomeIcon icon={faTags} />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="control" key={t.value + i}>
              <div
                className={`tags has-addons is-capitalized`}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`tag ${!t.isSelected ? color : "is-info"} ${size}`}
                  onClick={() => {
                    let newState = { ...state };
                    newState.tags[i].isSelected = !newState.tags[i].isSelected;
                    setState({ ...newState, ok: true });
                  }}
                >
                  {t.value}
                </div>
                <div
                  className={`tag ${size} is-delete `}
                  onClick={() => {
                    handleOnDeleteTag(i);
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <input
        type="text"
        className="input is-static"
        placeholder="type and hit enter..."
        onKeyUp={handleOnKeyUp}
        onKeyDown={handleOnBackSpace}
      />
    </div>
  );
};

export default PayloadTags;
