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
  const { data } = useLoaderData();
  const job = data.job;
  console.log(job);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method="post" className="form">
        <h4 className="form-title" style={{marginBottom: "1.5rem"}}>Edit Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={job.position}
          ></FormRow>
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
          ></FormRow>
          <FormRow
            type="text"
            name="jobLocation"
            defaultValue={job.jobLocation}
            labelText="Job Location"
          ></FormRow>
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          ></FormRowSelect>
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          ></FormRowSelect>
          <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EditJob;
