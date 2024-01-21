import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import FormRow from '../components/FormRow';

function Register() {
  return (
    <Wrapper>
      <form className="form">
        <div className="logo">
          <Logo></Logo>
        </div>
        <h3>Register</h3>
        <FormRow type="text" name="name" labelText="Name"></FormRow>
        <FormRow type="text" name="lastName" labelText="Last Name"></FormRow>
        <FormRow type="email" name="email" labelText="Email"></FormRow>
        <FormRow type="password" name="password" labelText="Password"></FormRow>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <div className="check-member">
          <span>Already a member?</span>
          <Link to="/login" className="member-btn">
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

