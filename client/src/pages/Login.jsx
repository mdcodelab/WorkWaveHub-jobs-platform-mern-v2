import React from 'react';
import { Link, useNavigation, Form, redirect} from "react-router-dom";
import FormRow from "../components/FormRow";
import styled from "styled-components";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/v1/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(
    `Error: ${error.response.data.message || error.response.statusText}`);
    //toast.error(error?.response?.data?.msg);
    return error;
  }
}

function Login() {
  const navigation=useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const navigate=useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@gmail.com",
      password: "secret123"
    }
    try {
      await axios.post("/api/v1/auth/login", data);
      toast.success("Take a test drive!");
      return navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  }

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button type="submit" className="btn btn-block explore" onClick={loginDemoUser}>
            Explore the app
        </button>
        <div className="check-member">
          <span>Not a member?</span>
          <Link to="/register" className="member-btn" style={{ color: "var(--primary-700" }}>
            Register</Link>
        </div>
        <Link to="/" className="back-home">
          Back Home
        </Link>
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
    margin: 0 auto;
    border-top: 5px solid var(--primary-500);
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
  }
  .check-member {
    width: max-content;
    margin: 0 auto;
    margin-top: 1.5rem;
  }
  .back-home {
    display: block;
    text-align: center;
    margin-top: 1.5rem;
    color: blue;
  }
  `

export default Login;
