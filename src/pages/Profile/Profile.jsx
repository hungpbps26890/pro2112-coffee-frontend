import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { fetchGetMyInfo, putUpdateMyInfo } from "../../services/UserService";

const Profile = () => {
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    getMyInfo();
  }, []);

  console.log("My info data: ", myInfo);

  const getMyInfo = async () => {
    const res = await fetchGetMyInfo();

    if (res && res.result) {
      const myInfo = res.result;

      setMyInfo({
        email: myInfo.email,
        firstName: myInfo.firstName ? myInfo.firstName : "",
        lastName: myInfo.lastName ? myInfo.lastName : "",
        dob: myInfo.dob,
      });
    }
  };

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    dob: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dob: Yup.date().required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    const data = JSON.stringify(values);
    console.log("Updated data: ", data);
    handleUpdateMyInfo(values);
  };

  const handleUpdateMyInfo = async (data) => {
    const res = await putUpdateMyInfo(data);

    if (res && res.result) {
      console.log("Updated user info: ", res.result);
      getMyInfo();
    }
  };

  return (
    <div className="container my-3">
      <div className="card w-75 mx-auto">
        <div className="card-header">
          <h4>Profile</h4>
        </div>
        <div className="card-body">
          <Formik
            initialValues={myInfo || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <FormikControl control="input" label="Email" name="email" />

                <FormikControl
                  control="input"
                  label="First name"
                  name="firstName"
                />

                <FormikControl
                  control="input"
                  label="Last name"
                  name="lastName"
                />

                <FormikControl control="date" label="Birth date" name="dob" />

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

export default Profile;
