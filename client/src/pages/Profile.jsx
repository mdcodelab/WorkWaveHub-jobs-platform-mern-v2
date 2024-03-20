import React from 'react';
import FormRow from '../components/FormRow';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form, redirect } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';


export const action = async ({request}) => {
  const formData = await request.formData();
  console.log(formData);
  const file = formData.get("avatar");
  console.log(file);
  if (file && file.size > 1000000) {
    toast.error("Image size too large");
    return null;
  }

  try {
    const response = await axios.patch("/api/v1/users/update-user", formData);
    toast.success("Profile updated successfully.");
    return redirect("/dashboard");
  } catch (error) {
    toast.error("There is an error");
    return null;
  }
}



function Profile() {
  const {user}=useOutletContext();
  const{name, lastName, email, location}=user;
  const navigation=useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method="post" className="form" encType="multipart/form-data">
      <h3 className="title" style={{textAlign: "left", marginBottom: "2rem"}}>Profile</h3>
        <div className="form-center">
        {/* file input */}
        <div className="form-row">
          <label htmlFor="avatar" className="form-label">Select an image file less than (max 1MB)
          </label>
          <input type="file" id="avatar" name="avatar" className="form-input" accept="image/*">
          </input>
        </div>
          <FormRow type="text" name="name" defaultValue={name}></FormRow>
        <FormRow type="text" name="lastName" defaultValue={lastName}></FormRow>
        <FormRow type="email" name="email" defaultValue={email}></FormRow>
        <FormRow type="text" name="location" defaultValue={location}></FormRow>
        <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save changes"}
        </button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
