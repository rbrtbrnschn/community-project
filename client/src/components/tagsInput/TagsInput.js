import React from "react";
import TagsInput from "./tagsInput";
const Tags = (props) => {
  const {
    onDelete,
    onBackspace,
    onKeyDown,
    color,
    tags,
    size,
    placeholder,
  } = props;
  return (
    <TagsInput
      onDelete={onDelete}
      onBackspace={onBackspace}
      onKeyDown={onKeyDown}
      color={color}
      tags={tags}
      size={size}
      placeholder={placeholder}
    />
  );
};

export default Tags;
