import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./pages/Menu/Menu";
import DrinkDetail from "./pages/DrinkDetail/DrinkDetail";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FormContainer from "./pages/FormContainer/FormContainer";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Checkout from "./pages/Checkout/Checkout";
import Order from "./pages/Order/Order";
import OrderDetails from "./pages/Order/OrderDetails";
import OAuth2LoginHandler from "./pages/Login/OAuth2LoginHandler";
import Address from "./components/Address/Address";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <NavBar />
      <div className="main min-vh-100 mb-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/category/:id" element={<Menu />} />
          <Route path="/drinks/:id" element={<DrinkDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/oauth2/redirect" element={<OAuth2LoginHandler />} />
          <Route path="/form" element={<FormContainer />} />
          <Route path="/address" element={<Address />} />
        </Routes>
      </div>
      <Footer />

      {/* Tostify */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default App;
