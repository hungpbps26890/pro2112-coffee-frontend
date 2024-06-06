import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu/Menu";
import DrinkDetail from "./pages/DrinkDetail/DrinkDetail";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FormContainer from "./pages/FormContainer/FormContainer";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/category/:id" element={<Menu />} />
        <Route path="/drinks/:id" element={<DrinkDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<FormContainer />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
