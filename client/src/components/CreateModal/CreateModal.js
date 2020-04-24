import React from "react";
import Create from "./createModal";
const CreateModal = (props) => {
  const { onAdd, className, onCancle } = props;
  return <Create onAdd={onAdd} className={className} onCancle={onCancle} />;
};

export default CreateModal;
