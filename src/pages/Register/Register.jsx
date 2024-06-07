import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { postRegister } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigator = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    confirmedPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must be match"),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    console.log("Saved data: ", JSON.stringify(values));
    handleRegister(values);
  };

  const handleRegister = async (data) => {
    const res = await postRegister(data);

    if (res && res.result) {
      console.log("Register user: ", res.result);
      navigator("/login");
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="card col-10 col-md-6 mx-auto shadow-sm border-0 rounded-4">
          <div className="card-body">
            <h3 className="text-center">Register</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
            >
              {(formik) => (
                <Form>
                  <FormikControl
                    control="input"
                    label="Username"
                    name="username"
                  />
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

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2">
                      Register
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
    </div>
  );
};

export default Register;
