import React from "react";
import "./fab.scss";

const Background = (props) => {
  const { onClickBackground } = props;
  return (
    <div
      className=""
      onClick={onClickBackground}
      style={props.style}
      className={props.className}
    ></div>
  );
};

export default Background;
