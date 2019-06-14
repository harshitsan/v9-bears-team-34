import React from "react";
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav id="navbar" className="navbar navbar-expand">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
