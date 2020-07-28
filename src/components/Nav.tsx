import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  color: #c0ffee;
  text-decoration: none;
  margin-top: 20px;
  min-width: 200px;
  display: inline-block;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Nav = () => (
  <nav>
    <NavLink to="/agenda">Agenda</NavLink>
    <NavLink to="/schedule">Schedule</NavLink>
  </nav>
);

export default Nav;
