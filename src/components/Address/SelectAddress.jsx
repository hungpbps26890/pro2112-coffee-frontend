import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";

const SelectAddress = ({ label, options, name, setValue }) => {
  return (
    <div className={`mb-3`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        className="form-select"
        onClick={(e) =>
          setValue({
            id: Number.parseInt(e.target.value),
            name: e.target.options[e.target.selectedIndex].text,
          })
        }
      >
        <option value="">{`Choose ${label}`}</option>
        {options.map((option) => {
          return (
            <option key={`${name}-${option.value}`} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default SelectAddress;
