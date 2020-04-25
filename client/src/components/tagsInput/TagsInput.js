import React from "react";
import TagsInput from "./tagsInput";
const Tags = (props) => {
  const { onDelete, onBackspace, onKeyDown, color, tags } = props;
  return (
    <TagsInput
      onDelete={onDelete}
      onBackspace={onBackspace}
      onKeyDown={onKeyDown}
      color={color}
      tags={tags}
    />
  );
};

export default Tags;
