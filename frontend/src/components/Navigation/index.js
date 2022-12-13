import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-header">
      <ul className="nav-buttons">
        <li className="nav-logo">
          <NavLink exact to="/">
            <img src="https://i.imgur.com/ycBLLUB.png" alt="MyBnB logo"></img>
          </NavLink>
        </li>
        {isLoaded && (
          <li className="profile-button">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
