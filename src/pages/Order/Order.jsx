import React, { useEffect, useState } from "react";
import { fetchGetOrdersByUser } from "../../services/OrderService";
import { NumericFormat } from "react-number-format";
import { format as dateFormat } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getOrdersByUser();
  }, []);

  const getOrdersByUser = async () => {
    const res = await fetchGetOrdersByUser();

    if (res && res.result) {
      console.log(res);
      setOrders(res.result);
    }
  };

  const handleCancel = () => {
    toast.success("Cancel order successfully!");
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row mb-3">
        <div className="card border-0">
          <h4>Your Orders</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Order Status</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, index) => (
                    <tr className="text-center align-middle" key={`${index}`}>
                      <th>{index + 1}</th>
                      <td>
                        {dateFormat(order.createDate, "dd/MM/yyyy, HH:mm:ss")}
                      </td>
                      <td>
                        <NumericFormat
                          value={order.totalPrice}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                      <td>{order.orderStatus.name}</td>
                      <td>{order.paymentMethod.name}</td>
                      <td>{order.paymentStatus ? "Paid" : "Not paid yet"}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary m-2"
                          onClick={() =>
                            navigator(`/order-details/${order.id}`)
                          }
                        >
                          Details
                        </button>
                        <button
                          className={`btn btn-outline-danger ${
                            order.orderStatus.id > 1 ? "disabled" : ""
                          }`}
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
