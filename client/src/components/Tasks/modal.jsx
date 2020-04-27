import React, { useState, useEffect, useContext } from "react";
import TagsInput from "../tagsInput";
import "bulma-checkradio/dist/css/bulma-checkradio.min.css";
import UserContext from "../../contexts/UserContext/UserContext";
const Modal = (props) => {
  const { task } = props;
  const { id, title, notes, payload, tags } = props.task;
  const { onCancle, onSaveChanges, onDelete } = props;
  const isStreak =
    task.payload === "Streak"
      ? true
      : task.payload === "Challenge"
      ? true
      : task.payload === "Daily"
      ? true
      : task.payload === "Habit"
      ? true
      : false;
  const hasTags = tags === undefined ? [] : tags;
  const isPrivate = task.isPrivate === true ? true : false;
  let _initialValues = {
    title: title,
    notes: notes,
    isPrivate: isPrivate,
    tags: hasTags,
  };
  if (isStreak) _initialValues.streak = task.streak;

  const [values, setValues] = useState(_initialValues);
  const context = useContext(UserContext);
  const index = context.state.player.tasks.findIndex(
    (t) => t.id === parseInt(id)
  );
  useEffect(() => {
    setValues({
      isPrivate: values.isPrivate,
      tags: values.tags,
      ...context.state.player.tasks[index],
    });
  }, [context.state.player.tasks[index]]);

  const handleOnChangePrivacy = (event) => {
    setValues({ ...values, isPrivate: !values.isPrivate });
  };
  const handleOnChangeTitle = (event) => {
    setValues({ ...values, title: event.target.value });
  };
  const handleOnChangeNotes = (event) => {
    setValues({ ...values, notes: event.target.value });
  };
  const handleOnChangeStreak = (event) => {
    setValues({ ...values, streak: event.target.value });
  };

  const processValues = (values) => {
    let keys = Object.keys(values);
    let vals = Object.values(values);

    for (let v in vals) {
      const parsed = parseInt(vals[v]);
      // eslint-disable-next-line
      if (parsed === parsed) {
        values[keys[v]] = parsed;
      }
    }
    return values;
  };

  // ! Tags
  const tagsOnKeyDown = (e) => {
    const { value } = e.target;
    const code = e.keyCode;
    const valid = [13, 32, 188];
    if (value === " ") {
      e.target.value = "";
      return;
    }
    if (valid.includes(code) && value) {
      // * Key Code Is Valid
      setValues({
        ...values,
        tags: [...values.tags, value.toLowerCase().trim()],
      });
      // * Add Tag / Reset Input
      e.target.value = "";
    }
  };
  const tagsOnBackspace = (e) => {
    const { value } = e.target;
    const code = e.keyCode;
    if (!value && code === 8) {
      const _tags = [...values.tags];
      _tags.pop();
      setValues({ ...values, tags: _tags });
    }
  };
  const tagsOnDelete = (i) => {
    const _tags = [...values.tags];
    _tags.splice(i, 1);
    setValues({ ...values, tags: _tags });
  };
  return (
    <div id={id + "-modal"} className="modal">
      <div className="modal-background" onClick={onCancle}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{payload + "#" + id}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancle}
          ></button>
        </header>
        <section className="modal-card-body">
          <input
            className="input"
            value={values.title}
            onChange={handleOnChangeTitle}
          />
          <textarea
            className="textarea"
            value={values.notes}
            onChange={handleOnChangeNotes}
          ></textarea>
          {isStreak && (
            <input
              className="input"
              value={values.streak}
              onChange={handleOnChangeStreak}
            />
          )}
          <div className="field" onClick={handleOnChangePrivacy}>
            <input
              className="is-checkradio"
              id={id + "-privacy-checkbox"}
              type="checkbox"
              name="exampleCheckbox"
              checked={values.isPrivate}
              onChange={() => {
                //
              }}
            />
            <label htmlFor="exampleCheckbox">Private</label>
          </div>
          <TagsInput
            color="is-link"
            size="is-medium"
            tags={values.tags || []}
            onKeyDown={tagsOnKeyDown}
            onDelete={tagsOnDelete}
            onBackspace={tagsOnBackspace}
          />
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-link"
            onClick={() => {
              const _values = processValues(values);
              onSaveChanges({ ...task, ..._values });
            }}
          >
            Save changes
          </button>
          <button
            className="button is-info"
            onClick={() => {
              onDelete(id);
            }}
          >
            Delete
          </button>
          <button className="button" onClick={onCancle}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export { Modal };
export default Modal;
