import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  console.log("usre", user);
  //   alert("sd");
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  console.log("path", path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <>
      <div className="fixed-top">
        <nav
          class="navbar navbar-expand-lg navbar-dark bg-dark  "
          style={{ justifyContent: "space-around" }}
        >
          <Link to={"/"} class="navbar-brand" href="#">
            Home
          </Link>
          <h1 className="text-white  text-center">Workout Hub</h1>

          <div class=" " id="navbarColor01">
            {/* <Link to={"/login"}> */}
            <button
              onClick={logout}
              class="btn btn-outline-danger my-2 mx-2 my-sm-0"
              type="submit"
            >
              Logout
            </button>
            {/* </Link> */}
          </div>
        </nav>
      </div>
    </>
  ) : (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        style={{ justifyContent: "space-around" }}
      >
        <Link to={"/"} class="navbar-brand" href="#">
          Home
        </Link>
        <h1 className="text-white  text-center">Workout Hub</h1>

        <div class=" " id="navbarColor01">
          <Link to={"/login"}>
            <button
              class="btn btn-outline-warning my-2 mx-2 my-sm-0"
              type="submit"
            >
              Login
            </button>
          </Link>
          <Link to={"/register"}>
            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">
              Register
            </button>
          </Link>
        </div>
      </nav>
    </>
  );

  return <>{menuBar}</>;
}

export default MenuBar;
