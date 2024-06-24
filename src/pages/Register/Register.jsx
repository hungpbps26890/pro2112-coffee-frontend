import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { postRegister } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigator = useNavigate();

  const initialValues = {
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmedPassword: "",
  };

  const regexPhoneNumber = /^(84|0[3|5|7|8|9])+([0-9]{8})/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string()
      .matches(regexPhoneNumber, "Phone number is not valid")
      .required("Required"),
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
    } else {
      console.log(res.response.data);
      const message = res.response.data.message;
      toast.error(message);
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
                  <FormikControl control="input" label="Email" name="email" />
                  <div className="row">
                    <div className="col-6">
                      <FormikControl
                        control="input"
                        label="Firstname"
                        name="firstName"
                      />
                    </div>
                    <div className="col-6">
                      <FormikControl
                        control="input"
                        label="Lastname"
                        name="lastName"
                      />
                    </div>
                  </div>
                  <FormikControl
                    control="input"
                    label="Phone number"
                    name="phoneNumber"
                  />
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
