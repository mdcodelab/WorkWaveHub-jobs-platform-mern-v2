import React from "react";
import { Link, redirect, useNavigation, Form } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import axios from "axios";

function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
  });

  return (
    <Wrapper>
      <form className="form">
        <div className="logo">
          <Logo></Logo>
        </div>
        <h3>Register</h3>
        <div className="form__row">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name"></input>
        </div>
        <div className="form__row">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName"></input>
        </div>

        <div className="form__row">
          <label htmlFor="location">Location</label>
          <input type="text" name="lastName" id="lastName"></input>
        </div>

        <div className="form__row">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"></input>
        </div>

        <div className="form__row">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"></input>
        </div>

        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <div className="check-member">
          <span>Already a member?</span>
          <Link
            to="/login"
            className="member-btn"
            style={{ color: "var(--primary-700" }}
          >
            Login
          </Link>
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;

  .form {
    width: 300px;
    height: 100%;
    box-shadow: var(--shadow-2);
    border-top: 4px solid var(--primary-500);
    margin: 0 auto;
  }

  .logo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form h3 {
    margin: 1rem 0;
    text-align: center;
  }

  .check-member {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 1.5rem 0;
  }

  .member-btn {
    display: block;
    margin-left: 1rem;
  }

  .back-home {
    display: block;
    margin: 0 auto !important;
  }
`;

export default Register;
