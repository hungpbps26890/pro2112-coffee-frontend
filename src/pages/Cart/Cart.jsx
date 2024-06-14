import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { NumericFormat } from "react-number-format";

const Cart = () => {
  const { cart, updateItemQuantity, removeFromCart } = useContext(StoreContext);

  console.log("Cart: ", cart);

  const increaseItemQuantity = (id, quantity) => {
    const data = { id, quantity: quantity + 1 };
    updateItemQuantity(data);
  };

  const decreaseItemQuantity = (id, quantity) => {
    if (quantity === 1) {
      removeFromCart(id);
    } else {
      const data = { id, quantity: quantity - 1 };
      updateItemQuantity(data);
    }
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row mb-3">
        <div className="card border-0">
          <h4>Your cart</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="text-center table-light">
                  <th>Drink</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Topping</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.cartItems &&
                  cart.cartItems.map((cartItem, index) => (
                    <tr className="text-center align-middle" key={`${index}`}>
                      <th width={120}>
                        <Link to={`/drinks/${cartItem.drink.id}`}>
                          <img
                            src={cartItem.drink.images[0]}
                            alt="drink image preview"
                            className="img-fluid rounded"
                          />
                        </Link>
                      </th>
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
                      <td width={300}>
                        <div className="d-flex justify-content-md-start flex-wrap">
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
                      <td width={170}>
                        <div className="d-flex justify-content-evenly align-content-stretch">
                          <button
                            className="btn btn-outline-light"
                            onClick={() =>
                              decreaseItemQuantity(
                                cartItem.id,
                                cartItem.quantity
                              )
                            }
                          >
                            <i className="fa-solid fa-minus text-danger"></i>
                          </button>
                          <span className="form-control mx-1">
                            {cartItem.quantity}
                          </span>
                          <button
                            className="btn btn-outline-light"
                            onClick={() =>
                              increaseItemQuantity(
                                cartItem.id,
                                cartItem.quantity
                              )
                            }
                          >
                            <i className="fa-solid fa-plus text-primary"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <NumericFormat
                          value={cartItem.price}
                          displayType="text"
                          thousandSeparator=","
                          suffix=" đ"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleRemoveFromCart(cartItem.id)}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
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
                <p className="cart-text">{cart.totalItems}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="cart-text">Subtotal</p>
                <p className="cart-text">
                  <NumericFormat
                    value={cart.totalPrice}
                    displayType="text"
                    thousandSeparator=","
                    suffix=" đ"
                  />
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <p className="cart-text">Shipping cost</p>
                <p className="cart-text">Free</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5 className="cart-text">Grand Total</h5>
                <h5 className="cart-text text-danger">
                  <NumericFormat
                    value={cart.totalPrice}
                    displayType="text"
                    thousandSeparator=","
                    suffix=" đ"
                  />
                </h5>
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
