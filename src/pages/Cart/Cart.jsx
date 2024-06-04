import React from "react";

const Cart = () => {
  return (
    <div className="container mt-3">
      <div className="row mb-3">
        <div className="card border-0">
          <h3>Your cart</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Drink name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Topping</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center align-middle">
                  <th>1</th>
                  <td>Coffee name</td>
                  <td>29.000 đ</td>
                  <td>
                    <select name="drinkSize" className="form-select">
                      <option value="1">S</option>
                      <option value="2">M</option>
                      <option value="3">L</option>
                    </select>
                  </td>
                  <td>Shot Expresso</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="form-control w-50 m-auto"
                    />
                  </td>
                  <td>29.000 đ</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
                <tr className="text-center align-middle">
                  <th>2</th>
                  <td>Coffee name</td>
                  <td>29.000 đ</td>
                  <td>
                    <select name="drinkSize" className="form-select">
                      <option value="1">S</option>
                      <option value="2">M</option>
                      <option value="3">L</option>
                    </select>
                  </td>
                  <td>Shot Expresso</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="form-control w-50 m-auto"
                    />
                  </td>
                  <td>29.000 đ</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
                <tr className="text-center align-middle">
                  <th>3</th>
                  <td>Coffee name</td>
                  <td>29.000 đ</td>
                  <td>
                    <select name="drinkSize" className="form-select">
                      <option value="1">S</option>
                      <option value="2">M</option>
                      <option value="3">L</option>
                    </select>
                  </td>
                  <td>Shot Expresso</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="form-control w-50 m-auto"
                    />
                  </td>
                  <td>29.000 đ</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
                <tr className="text-center align-middle">
                  <th>4</th>
                  <td>Coffee name</td>
                  <td>29.000 đ</td>
                  <td>
                    <select name="drinkSize" className="form-select">
                      <option value="1">S</option>
                      <option value="2">M</option>
                      <option value="3">L</option>
                    </select>
                  </td>
                  <td>Shot Expresso</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="form-control w-50 m-auto"
                    />
                  </td>
                  <td>29.000 đ</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card h-100 border-0">
            <h4>Cart Info</h4>
            <hr />
            <div>
              <div className="d-flex justify-content-between">
                <p className="cart-text">Quantity</p>
                <p className="cart-text">1</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="cart-text">Subtotal</p>
                <p className="cart-text">29.000 đ</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="cart-text">Shipping cost</p>
                <p className="cart-text">Free</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5 className="cart-text">Grand Total</h5>
                <h5 className="cart-text">29.000 đ</h5>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card h-100 border-0">
            <h4>Delivery Info</h4>
            <hr />
            <div>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Fullname
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="streetAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="streetAddress"
                      id="streetAddress"
                      placeholder="Street address"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      name="ward"
                      id="ward"
                      placeholder="Ward"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      name="district"
                      id="district"
                      placeholder="District"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      id="city"
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">
                    Payment
                  </label>
                  <select
                    name="paymentMethod"
                    id="paymentMethod"
                    className="form-select"
                  >
                    <option value="1">COD</option>
                    <option value="2">VNPay</option>
                  </select>
                </div>
                <button className="btn btn-warning">Check out</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
