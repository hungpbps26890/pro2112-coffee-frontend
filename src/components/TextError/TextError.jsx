import React from "react";

const TextError = (props) => {
  return <div className="form-text text-danger">{props.children}</div>;
};

export default TextError;
