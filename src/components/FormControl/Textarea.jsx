import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";

const Textarea = (props) => {
  const { label, name, ...rest } = props;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        className="form-control"
        rows="3"
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Textarea;
