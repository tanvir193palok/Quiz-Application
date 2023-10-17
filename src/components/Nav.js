import React from "react";
import Account from "./Account";
import classes from "../styles/Nav.module.css";
import logo from "../assets/images/logo-bg.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src={logo} alt="Logo" />
            <h3>Quizzy</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}

export default Nav;
