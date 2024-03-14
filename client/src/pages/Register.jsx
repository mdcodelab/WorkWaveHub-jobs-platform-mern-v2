import React from 'react';
import { Link, redirect, useNavigation, Form } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({request}) => {
    const formData= await request.formData(); //data as object introduced in the form 
    //console.log(formData);
    const data = Object.fromEntries(formData);
    //console.log(data);
    try {
        await axios.post("/api/v1/auth/register", data);
        toast.success("Registration successful");
        return redirect("/login");
    } catch (error) {
        toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
      console.log(error);
      return error  
    }
    return null;
}

function Register() {
    const navigation=useNavigation();
    const isSubmitting=navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
    margin: 0 auto;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }`

export default Register;
