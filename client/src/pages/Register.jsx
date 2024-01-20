import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components"

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <Link to="/login">Login page</Link>
    </div>
  );
}

export default Register;

