import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { Context3 } from "../../context/Context";

export const Header = () => {
  const [user, setUser] = useState(() => {
    let savedEmail = localStorage.getItem("email");
    let userSaved = localStorage.getItem(savedEmail);
    let userSavedValue = JSON.parse(userSaved);
    return userSavedValue;
  });

  const [pageTitle, setPageTitle] = useContext(Context3);

  return (
    <div className="header-wrapper">
      <div className="header container-header">
        <div className="header-user-info">
          <div>
            <img src="./images/userPhoto.png" alt="photo" />
          </div>
          <div className="header-user-name">
            <p>{user.name}</p>
          </div>
        </div>

        <div className="header-page-title">
          <p>{pageTitle}</p>
        </div>

        <div>
          <Link to='/' >
            <img src="./images/logo-mini.png" alt="logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};
