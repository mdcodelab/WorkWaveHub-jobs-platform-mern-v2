import React from 'react';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from "styled-components";
import axios from "axios";

//access data on a specific job - get request
export const loader = async ({params}) => {
  //console.log(params);  //id as an object (same thing with const params = useParams())
  try {
    const {data} = await axios.get(`/api/v1/jobs/${params.id}`);
    return {data};
  } catch (error) {
    toast.error(
      `Error: ${error.response.data.message || error.response.statusText}`);
    return redirect("/dashboard/all-jobs");
  }
}

//adit job - patch request
export const action = async () => {
  return null;
};

function EditJob() {
  const {data}=useLoaderData();
  const job=data.job;
  console.log(job);



  return (
    <div>
      <h1>Edit Job</h1>
    </div>
  );
}

export default EditJob;
