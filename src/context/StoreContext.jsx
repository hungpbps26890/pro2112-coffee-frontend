import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId, item) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: { ...item, quantity: 1 } }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: { item, quantity: prev[itemId].quantity + 1 },
      }));
    }
  };

  const removeFromCart = (itemId, item) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], quantity: prev[itemId].quantity - 1 },
    }));
  };

  useEffect(() => {
    console.log("CartItems: ", cartItems);
  }, [cartItems]);

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
