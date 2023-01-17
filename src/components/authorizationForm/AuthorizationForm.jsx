import "./AuthorizationForm.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import validator from "validator";
import { Icon } from "@iconify/react";
import { Input } from "../input/Input";
import { Context } from "../context/Context";
import { Button } from "../button/Button";

export const AuthorizationForm = () => {
  const [user, setUser] = useContext(Context);

  const [access, setAccess] = useState("");

  const readingInput = (event) => {
    event.persist();
    setUser((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitCheckin = (event) => {
    event.preventDefault();
    
    let userSaved = localStorage.getItem(user.email);
    let userSavedValue = JSON.parse(userSaved);

    if (!validator.isEmail(user.email)) {
      alert("Enter email, please!");
    } else if (!localStorage.getItem(user.email)) {
      alert("You are not registered!");
    } else if (!validator.isStrongPassword(user.password, { minSymbols: 0 })) {
      alert(
        "The password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter and numbers..."
      );
    } else if (userSavedValue.password !== user.password) {      
      alert("Wrong password!");
    } else {
      setAccess("/home");
    }
  };

  return (
    <div>
      <form className="authorization-form" method="post" action="">
        <div className="authorization-form-item">
          <label>
            <b>Email:</b>
            <p>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={readingInput}
              />
            </p>
          </label>
        </div>

        <div className="authorization-form-item">
          <label>
            <b>Password:</b>
            <p>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={readingInput}
              />
            </p>
          </label>
        </div>

        <div className="authorization-form-link">
          <button
            className="authorization-form-btn"
            onClick={submitCheckin}
            type="submit"
          >
            <Link to={access}>
              <Icon
                className="authorization-form-icon"
                icon="material-symbols:arrow-right-alt-rounded"
                width="45"
              />
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};
