import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/register">Register page</Link>
    </div>
  );
}

export default Login;
