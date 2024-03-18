import React from 'react';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from "styled-components";
import { useParams } from 'react-router-dom';

//access data on a specific job - get request
export const loader = async ({params}) => {
  console.log(params);  //id as an object (same thing with const params = useParams())
  return null;
}

//adit job - patch request
export const action = async () => {
  return null;
};

function EditJob() {
const params=useParams();
console.log(params);
  return (
    <div>
      <h1>Edit Job</h1>
    </div>
  );
}

export default EditJob;
