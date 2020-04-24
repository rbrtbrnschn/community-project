import React from "react";
import Create from "./createModal";
const CreateModal = (props) => {
  const { onAdd } = props;
  return <Create onAdd={onAdd} />;
};

export default CreateModal;
