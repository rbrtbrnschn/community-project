import React from "react";
import FabButton from "./fab";
const Fab = (props) => {
  const { onFilter, onAdd } = props;
  return <FabButton onFilter={onFilter} onAdd={onAdd} />;
};

export default Fab;
