import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand className="nav-item" as={NavLink} to="/">
        Quick Bike
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
        { !token ? <NavbarItem className="nav-item" path="/about" linkText="What is QB?" /> : null }
          <NavbarItem className="nav-item" path="/" linkText="Reserve Bike" />
  { user.reservation ? <NavbarItem className="nav-item" path="/mybike" linkText="My Bike" /> : null }
          {token ? <NavbarItem className="nav-item" path="/user" linkText="My Profile" /> : null }
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}