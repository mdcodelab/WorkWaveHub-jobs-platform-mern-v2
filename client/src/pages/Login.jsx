import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from '../components/Logo';

function Login() {
  return (
    <Wrapper>
      <form className="form">
        <div className="logo">
          <Logo></Logo>
        </div>
        <h3>Login</h3>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required></input>
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required></input>
        </div>

        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <button type="button" className="btn btn-block explore">
          <Link to="/dashboard">Explore the app</Link>
        </button>
        <div className="check-member">
          <span>Not a member?</span>
          <Link
            to="/register"
            className="member-btn"
            style={{ color: "var(--primary-700" }}
          >
            Register
          </Link>
        </div>
        <Link to="/" className="back-home">
          Back Home
        </Link>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    width: 300px;
    height: max-content;
    box-shadow: var(--shadow-2);
    border-top: 4px solid var(--primary-500);
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
    margin: 0 auto;
    text-align: center;
  }

  .explore {
    display: block;
    margin: 1.5rem 0;
  }
  .explore a {
    color: #fff;
  }

  .form-row {
    width: 98%;
    margin: 0 auto;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }

  .form-row label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .form-row input {
    width: 100%;
    padding: 0.2rem 0;
    border-radius: 0.25rem;
    border: 1.5px solid grey;
    outline: none;
    background: transparent;
    color: grey;
    transition: all 0.3s;
  }

  .form-row input:focus {
    border: 3px solid var(--primary-500);
  }
`;

export default Login;
