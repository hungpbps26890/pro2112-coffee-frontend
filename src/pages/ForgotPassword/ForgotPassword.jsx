import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { putForgotPassword } from "../../services/UserService";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);

    handleForgotPassword(values);
  };

  const handleForgotPassword = async (data) => {
    const res = await putForgotPassword(data);

    if (res && res.code === 1000) {
      const message = res.message;
      toast.success(message);
    } else {
      const message = "Your email is not found!";
      toast.error(message);
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="card col-10 col-md-6 mx-auto shadow-sm border-0 rounded-4">
          <div className="card-body">
            <h3 className="text-center">Forgot Password</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
            >
              {(formik) => (
                <Form>
                  <FormikControl control="input" label="Email" name="email" />

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2">
                      Reset Password
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

export default ForgotPassword;
