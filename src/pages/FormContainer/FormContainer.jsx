import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";

const FormContainer = () => {
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Option 1", value: "otion1" },
    { key: "Option 2", value: "otion2" },
    { key: "Option 3", value: "otion3" },
    { key: "Option 4", value: "otion4" },
  ];

  const radioOptions = [
    { key: "Active", value: "true" },
    { key: "Inactive", value: "false" },
  ];

  const checkboxOptions = [
    { key: "Option 1", value: "cOtion1" },
    { key: "Option 2", value: "cOtion2" },
    { key: "Option 3", value: "cOtion3" },
  ];

  const initialValues = {
    email: "",
    password: "",
    confirmedPassword: "",
    description: "",
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    confirmedPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must be match"),
    birthDate: Yup.date().required("Required").nullable(),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    console.log("Saved data: ", JSON.stringify(values));
  };

  return (
    <div className="container my-3">
      <div className="card w-75 mx-auto">
        <div className="card-header">
          <h4>Form</h4>
        </div>
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
          >
            {(formik) => (
              <Form>
                <FormikControl control="input" label="Email" name="email" />
                <FormikControl
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                />
                <FormikControl
                  control="input"
                  type="password"
                  label="Confirmed password"
                  name="confirmedPassword"
                />
                <FormikControl
                  control="textarea"
                  label="Description"
                  name="description"
                />
                <FormikControl
                  control="select"
                  label="Select a topic"
                  name="selectOption"
                  options={dropdownOptions}
                />

                <FormikControl
                  control="radio"
                  label="Radio topic"
                  name="radioOption"
                  options={radioOptions}
                />

                <FormikControl
                  control="checkbox"
                  label="Checkbox topic"
                  name="checkboxOption"
                  options={checkboxOptions}
                />

                <FormikControl
                  control="date"
                  label="Birth date"
                  name="birthDate"
                />

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary me-2">
                    Save
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
