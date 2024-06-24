import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { postLogout } from "../../services/AuthService";
const NavBar = () => {
  const { token, setToken, cart } = useContext(StoreContext);

  const navigator = useNavigate();

  const handleLogout = async () => {
    const res = await postLogout({ token });

    if (res) {
      localStorage.removeItem("token");
      setToken("");
      navigator("/home");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to={"/home"}>
          May Coffee
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/home"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/menu"}>
                Menu
              </NavLink>
            </li>

            {token && (
              <li className="nav-item">
                <NavLink className="nav-link" to={"/order"}>
                  Order
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {token && (
              <li className="nav-item align-content-center">
                <Link className="nav-link" to={"/cart"}>
                  <i className="fa-solid fa-cart-shopping position-relative">
                    {cart.totalItems > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-circle border-light bg-danger"
                        style={{ fontSize: 7 }}
                      >
                        {cart.totalItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </i>
                </Link>
              </li>
            )}
            {!token ? (
              <li className="nav-item">
                <Link className="nav-link " to={"/login"}>
                  <button
                    className="btn btn-outline-secondary rounded-5"
                    style={{ fontSize: 13, fontWeight: 500 }}
                  >
                    Login
                  </button>
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg-end">
                  <li>
                    <NavLink className="dropdown-item" to={"/profile"}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={"/change-password"}>
                      Change Password
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log out
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
