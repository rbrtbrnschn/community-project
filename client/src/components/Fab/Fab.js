import React from "react";
import FabButton from "./fab";
const Fab = (props) => {
  const { onFilter } = props;
  return <FabButton onFilter={onFilter} />;
};

export default Fab;
