import React from 'react';
import { redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({params}) => {
  try {
    await axios.delete(`/api/v1/jobs/${params.id}`);
    return toast.success("Job deleted successfully!");
  } catch (error) {
    toast.error("It was an error.")
    return redirect("/dashboard/all-jobs")
  }
}

function DeleteJob() {
  return (
    <div>
      <h1>Delete Job</h1>
    </div>
  );
}

export default DeleteJob;
