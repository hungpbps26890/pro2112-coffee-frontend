import { createContext, useEffect, useState } from "react";
import {
  deleteRemoveItemFromCart,
  fectchGetCartByUser,
  putAddItemToCart,
  putUpdateItemQuantity,
} from "../services/CartService";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getCartByUser();
    console.log("Cart: ", cart);
  }, [token]);

  const getCartByUser = async () => {
    if (localStorage.getItem("token")) {
      const res = await fectchGetCartByUser();

      if (res && res.result) {
        setCart(res.result);
      }
    }
  };

  const addToCart = async (item) => {
    if (token) {
      const res = await putAddItemToCart(item);

      if (res && res.result) {
        console.log("Cart item: ", res.result);
        getCartByUser();
      }
    } else {
      navigator("/login");
    }
  };

  const updateItemQuantity = async (data) => {
    const res = await putUpdateItemQuantity(data);

    if (res && res.result) {
      console.log("Cart item: ", res.result);
      getCartByUser();
    }
  };

  const removeFromCart = async (id) => {
    const res = await deleteRemoveItemFromCart(id);

    if (res && res.code === 1000) {
      console.log("Message: ", res.message);
      getCartByUser();
    }
  };

  const contextValue = {
    cart,
    setCart,
    addToCart,
    updateItemQuantity,
    removeFromCart,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
