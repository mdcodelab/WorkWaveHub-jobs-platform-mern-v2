import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import FormRow from '../components/FormRow';
import Logo from '../components/Logo';

function Login() {
  return (
    <Wrapper>
      <form className="form">
        <div className="logo">
          <Logo></Logo>
        </div>
        <h3>Login</h3>
        <FormRow type="email" name="email" labelText="email"></FormRow>
        <FormRow type="password" name="password" labelText="password"></FormRow>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <button type="button" className="btn btn-block explore">
          <Link to="/dashboard">Explore the app</Link>
        </button>
        <div className="check-member">
          <span>Not a member?</span>
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </div>
        <Link to="/" className="back-home">Back Home</Link>
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
    margin: 0 auto !important;
  }

  .back-home {
    display: block;
    margin: 0 auto;
  }

  .explore {
    display: block;
    margin: 1.5rem 0;
  }
  .explore a {
    color: #fff;
  }
  .back-home {
    display: block;
    text-align: center;
  }
`;

export default Login;
