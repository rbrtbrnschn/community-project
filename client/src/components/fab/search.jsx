import React from "react";
import "./description";
import Description from "./description";
const Search = (props) => {
  const { onCancle } = props;
  return (
    <div className="modal is-active" id="search-modal">
      <div className="modal-background" onClick={onCancle}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancle}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="control">
              <input type="text" className="input" placeholder="search" />
            </div>
            <hr />
            <Description a="a" b="b" />
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-link">Save changes</button>
          <button className="button is-info" onClick={onCancle}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Search;
