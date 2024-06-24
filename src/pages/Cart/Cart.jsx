import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, updateItemQuantity, removeFromCart } = useContext(StoreContext);

  const navigator = useNavigate();

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

  const handleCheckout = () => {
    if (cart.cartItems.length > 0) {
      navigator("/checkout");
    } else {
      toast.info("Your cart is empty, please add some drink to cart!");
      navigator("/menu");
    }
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row mb-3">
        <div className="card border-0">
          <h4>Your Cart</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="text-center">
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
                      <td style={{ maxWidth: 150 }}>
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
        <div className="ms-auto col-md-6 mb-3">
          <div className="card h-100 border-0">
            <h4>Cart Totals</h4>
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
                  className="btn btn-outline-white text-white "
                  style={{ backgroundColor: "#e57905" }}
                  onClick={handleCheckout}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
