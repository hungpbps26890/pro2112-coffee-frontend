import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchGetDrinkById,
  fetchGetDrinksByCategoryId,
} from "../../services/DrinkService";
import { StoreContext } from "../../context/StoreContext";
import { Field, Form, Formik } from "formik";
import FormikControl from "../../components/FormControl/FormikControl";

const DrinkDetail = () => {
  const [drink, setDrink] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [drinkPrice, setDrinkPrice] = useState(0);
  const [toppingPrice, seTtoppingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  const { addToCart } = useContext(StoreContext);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDrinkById(id);
    }
  }, [id]);

  useEffect(() => {
    setTotalPrice(drinkPrice + toppingPrice);
  }, [drinkPrice, toppingPrice]);

  const getDrinkById = async (id) => {
    const res = await fetchGetDrinkById(id);

    if (res && res.result) {
      const drink = res.result;
      console.log(drink);
      setDrink(drink);
      setTotalPrice(drink.price);
      setDrinkPrice(drink.price);
      getDrinksByCategoryId(drink.category.id);
    }
  };

  const getDrinksByCategoryId = async (id) => {
    const res = await fetchGetDrinksByCategoryId(id);

    if (res && res.result) {
      setDrinks(res.result);
      console.log("Drink data by category: ", res);
    }
  };

  const initialValues = {
    drinkId: id,
    drinkSize: "",
    toppings: [],
    total: "",
    note: "",
  };

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    const cartItem = { ...values, total: totalPrice };
    console.log("Cart item: ", cartItem);
    addToCart(cartItem.drinkId, cartItem);
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row">
        <div className="card mb-3 border-0 ">
          <div className="row g-0">
            <div className="col-md-6">
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  {drink &&
                    drink.images &&
                    drink.images.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index == 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <img
                          src={image}
                          className="d-block w-100 "
                          alt="Drink image preview"
                        />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body pt-0">
                <h3 className="card-title">{drink.name}</h3>
                <h4 className="card-title text-danger">{totalPrice} đ</h4>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validateOnChange={false}
                >
                  {(formik) => (
                    <Form>
                      {drink.drinkSizes && drink.drinkSizes.length > 0 && (
                        <div className="mb-2">
                          <p className="card-text">Chọn size</p>
                          <div className="d-flex flex-wrap">
                            <Field name="drinkSize">
                              {({ field }) => {
                                return drink.drinkSizes.map(
                                  (drinkSize, index) => (
                                    <span key={`drinkSize-${index}`}>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        {...field}
                                        value={drinkSize.size.id}
                                        id={`drinkSize-${drinkSize.size.id}`}
                                        checked={
                                          field.value ===
                                          drinkSize.size.id.toString()
                                        }
                                        onClick={() => {
                                          setDrinkPrice(drinkSize.price);
                                        }}
                                      />
                                      <label
                                        className="btn btn-outline-secondary me-2 mb-2"
                                        htmlFor={`drinkSize-${drinkSize.size.id}`}
                                      >
                                        {drinkSize.size.name} +{" "}
                                        {drinkSize.price - drink.price} đ
                                      </label>
                                    </span>
                                  )
                                );
                              }}
                            </Field>
                          </div>
                        </div>
                      )}

                      {drink.toppings && drink.toppings.length > 0 && (
                        <div className="mb-2">
                          <p className="card-text">Topping</p>
                          <div className="d-flex flex-wrap">
                            <Field name="toppings">
                              {({ field }) => {
                                return drink.toppings.map((topping, index) => (
                                  <span key={`topping-${index}`}>
                                    <Field
                                      type="checkbox"
                                      className="btn-check"
                                      {...field}
                                      value={topping.id}
                                      id={`topping-${topping.id}`}
                                      checked={field.value.includes(
                                        topping.id.toString()
                                      )}
                                      onClick={(e) => {
                                        e.target.checked
                                          ? seTtoppingPrice(
                                              (prev) => prev + topping.price
                                            )
                                          : seTtoppingPrice(
                                              (prev) => prev - topping.price
                                            );
                                      }}
                                    />
                                    <label
                                      className="btn btn-outline-secondary me-2 mb-2"
                                      htmlFor={`topping-${topping.id}`}
                                    >
                                      {topping.name} + {topping.price} đ
                                    </label>
                                  </span>
                                ));
                              }}
                            </Field>
                          </div>
                        </div>
                      )}

                      <FormikControl
                        control="textarea"
                        label="Ghi chú"
                        name="note"
                      />

                      <button
                        className="btn btn-warning w-100 fw-bold text-white"
                        type="submit"
                      >
                        Đặt hàng ngay
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0">
          <hr />
          <h4 className="card-title">Mô tả sản phẩm</h4>
          <p className="card-text">{drink.description}</p>
          <hr />
        </div>
        <div className="card border-0">
          <h4 className="card-title">Sản phẩm liên quan</h4>
          <div className="related-drink row">
            {drinks &&
              drinks.length &&
              drinks.map((drink, index) => (
                <div
                  className="col-6 col-md-4 col-lg-3 mb-3"
                  key={`drink-${index}`}
                >
                  <div className="card border-0">
                    <img
                      src={drink.images[0]}
                      className="card-img-top h-50"
                      alt={drink.name}
                    />
                    <div className="card-body px-0">
                      <Link to={`/drinks/${drink.id}`} className="nav-link">
                        <h5 className="card-title">{drink.name}</h5>
                      </Link>
                      <p className="card-text text-danger">{drink.price} đ</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetail;
