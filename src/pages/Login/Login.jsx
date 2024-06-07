import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { postLogin } from "../../services/AuthService";

const Login = () => {
  const { token, setToken } = useContext(StoreContext);

  const navigator = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    handleLogin(values);
  };

  const handleLogin = async (data) => {
    const res = await postLogin(data);

    if (res && res.result) {
      const token = res.result.token;
      setToken(token);
      localStorage.setItem("token", token);
      navigator("/home");
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="card col-10 col-md-6 mx-auto shadow-sm border-0 rounded-4">
          <div className="card-body">
            <h3 className="text-center">Login</h3>
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
    </div>
  );
};

export default Login;
