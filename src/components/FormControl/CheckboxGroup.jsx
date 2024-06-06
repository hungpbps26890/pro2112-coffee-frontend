import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";

const CheckboxGroup = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className={`mb-3`}>
      <label htmlFor={name} className="form-label d-block">
        {label}
      </label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div className="form-check form-check-inline" key={option.key}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`${name}-${option.value}`}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value.toString())}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="form-check-label"
                >
                  {option.key}
                </label>
              </div>
            );
          });
        }}
      </Field>
      <br />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default CheckboxGroup;
