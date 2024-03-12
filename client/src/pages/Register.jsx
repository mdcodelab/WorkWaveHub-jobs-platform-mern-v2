import React from "react";
import { Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
  });


  function handleChange(e) {
    const {name, value}=e.target;
    setFormData(prevState => ({
      ...prevState, [name]: value
    })) 
  }

  const navigate=useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

async function handleSubmit(e) {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const response = await axios.post("/api/v1/auth/register", formData);
    console.log(response.data);
    toast.success("Registration successful");
    navigate("/login");
  } catch (error) {
    toast.error(
      `Error: ${error.response.data.message || error.response.statusText}`
    );
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="logo">
          <Logo></Logo>
        </div>
        <h3>Register</h3>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required></input>
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required></input>
        </div>

        <div className="form-row">
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required></input>
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required></input>
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required></input>
        </div>

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
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
    overflow-y: hidden;
  }

  .logo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form h3 {
    margin: 1rem 0;
    margin-bottom: 2rem;
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

  .btn-block {
    display: block;
    margin-top: 2rem;
  }
`;

export default Register;
