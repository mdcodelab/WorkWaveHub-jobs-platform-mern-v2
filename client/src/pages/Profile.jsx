import React from 'react';
import FormRow from '../components/FormRow';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from "styled-components";


function Profile() {
  const {user}=useOutletContext();
  const{name, lastName, email, location}=user;
  const navigation=useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method="post" className="form" encType="multupart/form-data">
      <h3 className="title" style={{textAlign: "left", marginBottom: "2rem"}}>Profile</h3>
        <div className="form-center">
        {/* file input */}
        <div className="form-row">
          <label htmlFor="avatar" className="form-label">Select an image file less than (max 0.5MB)
          </label>
          <input type="file" id="avatar" name="avatar" className="form-input" accept="image/*">
          </input>
        </div>
          <FormRow type="text" name="name" defaultValue={name}></FormRow>
        <FormRow type="text" name="lastName" defaultValue={lastName}></FormRow>
        <FormRow type="email" name="email" defaultValue={email}></FormRow>
        <FormRow type="text" name="location" defaultValue={location}></FormRow>
        <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
