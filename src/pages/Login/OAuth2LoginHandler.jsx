import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const OAuth2LoginHandler = () => {
  const { setToken } = useContext(StoreContext);

  const navigator = useNavigate();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const handleOAuth2Login = () => {
    const token = getUrlParameter("token");

    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
      navigator("/home");
    }
  };

  useEffect(() => {
    handleOAuth2Login();
  }, []);
};

export default OAuth2LoginHandler;
