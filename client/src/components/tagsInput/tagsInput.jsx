import React from "react";
const TagsInput = (props) => {
  const { color, onDelete, onBackspace, onKeyDown, tags } = props;

  return (
    <div className="">
      <div className="field is-grouped is-grouped-multiline">
        {tags.map((tag, i) => (
          <div className="control" key={tag + i}>
            <div className="tags has-addons">
              <span className={`tag ${color}`}>{tag}</span>
              <span
                className="tag is-delete"
                onClick={() => {
                  onDelete(i);
                }}
              ></span>
            </div>
          </div>
        ))}
        <input
          className="input is-static"
          placeholder="Type and hit enter..."
          onKeyUp={onKeyDown}
          onKeyDown={onBackspace}
        ></input>
      </div>
    </div>
  );
};

export default TagsInput;
/*
<div className="textarea">
      <ul className="field is-grouped is-grouped-multiline">
        {tags.map((tag, i) => (
          <div className="control">
            <li className={`tags has-addons `}>
              <span className={`tag is-capitalized ${color}`}>{tag}</span>
              <span
                className="tag is-delete"
                onClick={() => {
                  handleOnDelete(i);
                }}
              ></span>
            </li>
          </div>
        ))}
        <hr />
        <li className="input-tags-input">
          <input
            type="text"
            className="input is-capitalized is-static"
            onKeyUp={handleOnKeyDown}
            onKeyDown={handleOnBackspace}
          />
        </li>
      </ul>
    </div>
    */
