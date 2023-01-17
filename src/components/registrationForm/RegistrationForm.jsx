import "./RegistrationForm.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import validator from "validator";
import { Icon } from "@iconify/react";
import { Input } from "../input/Input";
import { Context } from "../context/Context";
import { Button } from "../button/Button";

export const RegistrationForm = () => {
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
    if (user.name.length === 0) {
      alert("Enter your name, please!");
    } else if (!validator.isEmail(user.email)) {
      alert("Enter your email, please!");
    } else if (user.residence.length === 0) {
      alert("Enter your residence, please!");
    } else if (!validator.isStrongPassword(user.password, { minSymbols: 0 })) {
      alert(
        "The password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter and numbers..."
      );
    }else {
      setAccess("/home");
    }
    
  };

  useEffect(() => {

    localStorage.setItem(user.email, JSON.stringify(user));
  }, [user.password]);

  useEffect(() => {
    
    localStorage.setItem("email", user.email);
  }, [user.email]);

  return (
    <div>
      <form className="registration-form" method="post" action="">
        <div className="registration-form-item">
          <label>
            <b>Name:</b>
            <p>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={readingInput}
                formnovalidate
              />
            </p>
          </label>
        </div>

        <div className="registration-form-item">
          <label>
            <b>Email:</b>
            <p>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={readingInput}
                formnovalidate
              />
            </p>
          </label>
        </div>

        <div className="registration-form-item">
          <label>
            <b>Residence:</b>
            <p>
              <input
                type="text"
                id="residence"
                name="residence"
                value={user.residence}
                onChange={readingInput}
                formnovalidate
              />
            </p>
          </label>
        </div>

        <div className="registration-form-item">
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

        <div className="registration-form-link">
          <button className="registration-form-btn" onClick={submitCheckin} type="submit">
            <Link to={access}>
              <Icon
                className="registration-form-icon"
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
