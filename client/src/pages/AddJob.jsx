import React from 'react';
import FormRow from "../components/FormRow";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import FormRowSelect from '../components/FormRowSelect';

function AddJob() {
  const {user}=useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <form method="post" className="post">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position"></FormRow>
          <FormRow type="text" name="company"></FormRow>
          <FormRow type="text" labelText="job location" name="jobLocation" 
          defaultValue={user.location}></FormRow>
          <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <FormRowSelect labelFor="jobStatus" name="jobStatus" 
          defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}></FormRowSelect>
           <FormRowSelect labelFor="jobType" name="jobType" 
          defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}></FormRowSelect>
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default AddJob;


