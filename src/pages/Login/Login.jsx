import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { Link } from "react-router-dom";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
  };

  return (
    <div className="container my-3">
      <div className="card w-75 mx-auto">
        <div className="card-header">
          <h4>Login</h4>
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

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary me-2">
                    Login
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
                <div className="form-text">
                  Create a new account?{" "}
                  <Link to={"/register"} className="text-decoration-none">
                    Click here
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
