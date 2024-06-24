import React, { useEffect, useState } from "react";
import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
  apiGetPublicWards,
} from "../../services/VNProvinceService";
import SelectAddress from "./SelectAddress";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");

  useEffect(() => {
    const fetchPublicProvinces = async () => {
      const response = await apiGetPublicProvinces();
      console.log(response);

      if (response.status === 200)
        setProvinces(
          response.data.results.map((province) => ({
            key: province.province_name,
            value: province.province_id,
          }))
        );
    };

    fetchPublicProvinces();
  }, []);

  useEffect(() => {
    const fetchPublicDistricts = async (province) => {
      const response = await apiGetPublicDistricts(province);

      if (response.status === 200)
        setDistricts(
          response.data.results.map((district) => ({
            key: district.district_name,
            value: district.district_id,
          }))
        );
    };

    if (province !== "") fetchPublicDistricts(province);
  }, [province]);

  useEffect(() => {
    const fetchPublicWards = async (district) => {
      const response = await apiGetPublicWards(district);

      if (response.status === 200)
        setWards(
          response.data.results.map((ward) => ({
            key: ward.ward_name,
            value: ward.ward_id,
          }))
        );
    };

    if (district !== "") fetchPublicWards(district);
  }, [district]);

  const initialValues = {
    province: province,
    district: district,
    ward: district,
  };

  const validationSchema = Yup.object({
    province: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    ward: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log("Values: ", values);
  };

  console.log({ province, district, ward });

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
                <SelectAddress
                  label="Tỉnh/Thành phố"
                  options={provinces}
                  name="province"
                  setValue={setProvince}
                />

                <SelectAddress
                  label="Quận/Huyện"
                  options={districts}
                  name="district"
                  setValue={setDistrict}
                />

                <SelectAddress
                  label="Phường/Xã"
                  options={wards}
                  name="ward"
                  setValue={setWard}
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

export default Address;
