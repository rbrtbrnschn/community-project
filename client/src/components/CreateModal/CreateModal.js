import React from "react";
import Create from "./_createModal";
const CreateModal = (props) => {
  const { onAdd, className, onCancle } = props;
  return <Create onAdd={onAdd} className={className} onCancle={onCancle} />;
};

export default CreateModal;
