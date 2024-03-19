import React from 'react';
import { useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

export const loader = async () => {
  try {
    const response = await axios.get("/api/v1/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect("/dashboard");
  }
}

function Admin() {
  const {users, jobs} = useLoaderData();
  
  return (
    <div>
      <h1>Admin PAge</h1>
    </div>
  );
}

export default Admin;
