import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const ActionButton = (props) => {
  return <Action icon={<FontAwesomeIcon icon="user" />} />;
};

export default ActionButton;
