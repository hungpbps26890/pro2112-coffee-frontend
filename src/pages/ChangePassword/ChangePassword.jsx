import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { putChangePassword } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextError from "../../components/TextError/TextError";

const ChangePassword = () => {
  const navigator = useNavigate();

  const [passwordInvalid, setPasswordInvalid] = useState("");

  const initialValues = {
    password: "",
    newPassword: "",
    confirmedNewPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    newPassword: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    confirmedNewPassword: Yup.string()
      .required("Required")
      .oneOf(
        [Yup.ref("newPassword")],
        "Confirmed password must be match new password"
      ),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    handleChangePassword(values);
  };

  const handleChangePassword = async (data) => {
    const res = await putChangePassword(data);

    if (res && res.code === 1000) {
      toast.success(res.message);
      navigator("/profile");
    } else {
      const message = res.response.data.message;
      toast.error(message);
      setPasswordInvalid(message);
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
                  {passwordInvalid && (
                    <div className="alert alert-danger" role="alert">
                      {passwordInvalid}
                    </div>
                  )}
                  <FormikControl
                    control="input"
                    type="password"
                    label="Current Password"
                    name="password"
                  />

                  <FormikControl
                    control="input"
                    type="password"
                    label="New Password"
                    name="newPassword"
                  />

                  <FormikControl
                    control="input"
                    type="password"
                    label="Confirmed Password"
                    name="confirmedNewPassword"
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
    </div>
  );
};

export default ChangePassword;
