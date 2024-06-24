import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Formik, Form } from "formik";
import FormikControl from "../../components/FormControl/FormikControl";
import { fetchGetOrderById } from "../../services/OrderService";

const OrderDetails = () => {
  const [order, setOrder] = useState();
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

  console.log("Order: ", order);

  const { id } = useParams();

  const getOrderById = async (id) => {
    const res = await fetchGetOrderById(id);

    if (res && res.result) {
      console.log("Result: ", res.result);
      setOrder(res.result);
    }
  };

  useEffect(() => {
    if (id) {
      getOrderById(id);
    }
  }, [id]);

  useEffect(() => {
    if (order) {
      const user = order.user;

      setInitialValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        paymentMethod: order.paymentMethod.name,
        address: {
          streetNumber: order.address.streetNumber,
          ward: order.address.ward,
          district: order.address.district,
          province: order.address.province,
        },
      });
    }
  }, [order]);

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
                {order &&
                  order.orderItems &&
                  order.orderItems.map((orderItem, index) => (
                    <tr className="text-center align-middle" key={`${index}`}>
                      <th>{index + 1}</th>
                      <td>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/drinks/${orderItem.drink.id}`}
                        >
                          {orderItem.drink.name}
                        </Link>
                      </td>
                      <td>
                        <NumericFormat
                          value={orderItem.price / orderItem.quantity}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                      <td>
                        <span className="badge rounded-pill text-bg-secondary py-2 px-4">
                          {orderItem.size && orderItem.size.character}
                        </span>
                      </td>
                      <td style={{ maxWidth: 150 }}>
                        <div className="d-flex justify-content-center flex-wrap">
                          {orderItem.toppings.length > 0 &&
                            orderItem.toppings.map((topping) => (
                              <span
                                className="badge rounded-pill text-bg-secondary m-1 py-2 px-3"
                                key={`topping-${topping.id}`}
                              >
                                {topping.name}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td>{orderItem.quantity}</td>
                      <td>
                        <NumericFormat
                          value={orderItem.price}
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

      {order && (
        <Formik initialValues={initialValues} enableReinitialize>
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
                        readOnly
                      />

                      <div className="row">
                        <div className="col-md-4">
                          <FormikControl
                            control="input"
                            label="Ward"
                            name="address.ward"
                            readOnly
                          />
                        </div>
                        <div className="col-md-4">
                          <FormikControl
                            control="input"
                            label="District"
                            name="address.district"
                            readOnly
                          />
                        </div>
                        <div className="col-md-4">
                          <FormikControl
                            control="input"
                            label="Province"
                            name="address.province"
                            readOnly
                          />
                        </div>
                      </div>
                      <FormikControl
                        control="input"
                        label="Payment"
                        name="paymentMethod"
                        readOnly
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
                        <p className="card-text">{order.totalItems}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text">Subtotal</p>
                        <p className="card-text">
                          <NumericFormat
                            value={order.totalPrice}
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
                            value={order.totalPrice}
                            displayType="text"
                            thousandSeparator=","
                            suffix=" đ"
                          />
                        </h6>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default OrderDetails;
