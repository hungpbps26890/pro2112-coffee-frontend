import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { NumericFormat } from "react-number-format";
import { fetchGetAllPaymentMethods } from "../../services/PaymentMethodService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { postCreateOrder } from "../../services/OrderService";
import { toast } from "react-toastify";
import SelectAddress from "../../components/Address/SelectAddress";
import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
  apiGetPublicWards,
} from "../../services/VNProvinceService";
import { createVNPayPayment } from "../../services/PaymentService";

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState({ id: null, name: "" });
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState({ id: null, name: "" });
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState({ id: null, name: "" });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [user, setUser] = useState();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    paymentMethodId: 1,
    address: {
      streetNumber: "",
      ward: "",
      district: "",
      province: "",
    },
  });

  const { cart, getCartByUser } = useContext(StoreContext);

  const navigator = useNavigate();

  console.log("Cart: ", cart);
  console.log("User: ", user);
  console.log("Payment Methods: ", paymentMethods);

  useEffect(() => {
    getAllPaymentMethods();
  }, []);

  useEffect(() => {
    setUser(cart.user);
  }, [cart]);

  useEffect(() => {
    if (user) {
      setInitialValues((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }));
    }
  }, [user]);

  const getAllPaymentMethods = async () => {
    const res = await fetchGetAllPaymentMethods();

    if (res && res.result) {
      const paymentMethodsData = res.result;

      setPaymentMethods(
        paymentMethodsData.map((paymentMethod) => ({
          key: paymentMethod.name,
          value: paymentMethod.id,
        }))
      );
    }
  };

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
      const response = await apiGetPublicDistricts(province.id);

      if (response.status === 200)
        setDistricts(
          response.data.results.map((district) => ({
            key: district.district_name,
            value: district.district_id,
          }))
        );
    };

    if (province.id) fetchPublicDistricts(province);
  }, [province]);

  useEffect(() => {
    const fetchPublicWards = async (district) => {
      const response = await apiGetPublicWards(district.id);

      if (response.status === 200)
        setWards(
          response.data.results.map((ward) => ({
            key: ward.ward_name,
            value: ward.ward_id,
          }))
        );
    };

    if (district.id) fetchPublicWards(district);
  }, [district]);

  const regexPhoneNumber = /^(84|0[3|5|7|8|9])+([0-9]{8})/;

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string()
      .matches(regexPhoneNumber, "Phone number is not valid")
      .required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.object({
      streetNumber: Yup.string().required("Required"),
      ward: Yup.string().required("Required"),
      district: Yup.string().required("Required"),
      province: Yup.string().required("Required"),
    }),
  });

  const onSubmit = (values) => {
    console.log("Form values: ", values);

    const data = {
      address: {
        streetNumber: values.address.streetNumber,
        ward: ward.name,
        district: district.name,
        province: province.name,
      },
      paymentMethod: { id: values.paymentMethodId },
    };

    console.log("Data: ", data);

    if (cart.cartItems.length > 0) {
      handleCreateOrder(data);
    } else {
      toast.info("Your cart is empty, please add some drink to cart!");
      navigator("/menu");
    }
  };

  const handleCreateOrder = async (data) => {
    const res = await postCreateOrder(data);

    if (res && res.result) {
      const createdOrder = res.result;
      console.log("Created order: ", createdOrder);

      if (createdOrder.paymentMethod.name === "VNPAY") {
        const paymentResponse = await createVNPayPayment(
          createdOrder.totalPrice,
          createdOrder.id
        );

        if (paymentResponse && paymentResponse.code == 1000) {
          console.log("Payment response: ", paymentResponse);
          window.location.href = paymentResponse.result.paymentUrl;
        }
      } else {
        toast.success(res.message);
        getCartByUser();

        navigator("/order");
      }
    }
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row mb-3">
        <div className="card border-0">
          <h4>Your Order</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="text-center ">
                  <th>#</th>
                  <th>Drink Name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Topping</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.cartItems &&
                  cart.cartItems.map((cartItem, index) => (
                    <tr className="text-center align-middle" key={`${index}`}>
                      <th>{index + 1}</th>
                      <td>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/drinks/${cartItem.drink.id}`}
                        >
                          {cartItem.drink.name}
                        </Link>
                      </td>
                      <td>
                        <NumericFormat
                          value={cartItem.price / cartItem.quantity}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                      <td>
                        <span className="badge rounded-pill text-bg-secondary py-2 px-4">
                          {cartItem.size && cartItem.size.character}
                        </span>
                      </td>
                      <td style={{ maxWidth: 140 }}>
                        <div className="d-flex justify-content-center flex-wrap">
                          {cartItem.toppings.length > 0 &&
                            cartItem.toppings.map((topping) => (
                              <span
                                className="badge rounded-pill text-bg-secondary m-1 py-2 px-3"
                                key={`topping-${topping.id}`}
                              >
                                {topping.name}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td>{cartItem.quantity}</td>
                      <td>
                        <NumericFormat
                          value={cartItem.price}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card h-100 border-0">
                  <h4>Delivery Information</h4>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <FormikControl
                          control="input"
                          label="First name"
                          name="firstName"
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <FormikControl
                          control="input"
                          label="Last name"
                          name="lastName"
                          readOnly
                        />
                      </div>
                    </div>

                    <FormikControl
                      control="input"
                      label="Email"
                      name="email"
                      readOnly
                    />

                    <FormikControl
                      control="input"
                      label="Phone number"
                      name="phoneNumber"
                      readOnly
                    />

                    <FormikControl
                      control="input"
                      label="Street number"
                      name="address.streetNumber"
                    />

                    <div className="row">
                      <div className="col-md-4">
                        <SelectAddress
                          label="Ward"
                          options={wards}
                          name="address.ward"
                          setValue={setWard}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectAddress
                          label="District"
                          options={districts}
                          name="address.district"
                          setValue={setDistrict}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectAddress
                          label="Province"
                          options={provinces}
                          name="address.province"
                          setValue={setProvince}
                        />
                      </div>
                    </div>
                    <FormikControl
                      control="select"
                      label="Payment"
                      name="paymentMethodId"
                      options={paymentMethods}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card h-100 border-0">
                  <h4>Order Totals</h4>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">Quantity</p>
                      <p className="card-text">{cart.totalItems}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">Subtotal</p>
                      <p className="card-text">
                        <NumericFormat
                          value={cart.totalPrice}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="card-text">Delivery Fee</p>
                      <p className="card-text">Free</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h6 className="card-text">Total</h6>
                      <h6 className="card-text text-danger">
                        <NumericFormat
                          value={cart.totalPrice}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </h6>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-outline-white text-white"
                        style={{ backgroundColor: "#e57905" }}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
