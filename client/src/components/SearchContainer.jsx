import React from 'react';
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";
import styled from "styled-components";

function SearchContainer() {
  const {data, searchValues}=useAllJobsContext();
  const {search, jobStatus, jobType, sort}=searchValues; //can be set as default values
  

  const submit = useSubmit();

  //get request in the form (by default) on the same page
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search form</h5>
        <div className="form-center">
          <FormRow type="search" name="search" defaultValue="a" 
          onChange={(e)=>submit(e.currentTarget.form)}></FormRow>

          <FormRowSelect labelText="job status" name="jobStatus"
           list={["all", ...Object.values(JOB_STATUS)]} defaultValue="all" 
           onChange={(e)=>submit(e.currentTarget.form)}></FormRowSelect>

            <FormRowSelect labelText="job type" name="jobType"
           list={["all", ...Object.values(JOB_TYPE)]} defaultValue="all" 
           onChange={(e)=>submit(e.currentTarget.form)}></FormRowSelect>

            <FormRowSelect labelText="sort" name="sort"
           list={[...Object.values(JOB_SORT_BY)]} defaultValue="newest" 
           onChange={(e)=> submit(e.currentTarget.form)}></FormRowSelect>

           <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn" style={{color: "white"}}>
        Reset Search Values</Link>
        </div>
        
      </Form>
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
    align-self: end !important;
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

export default SearchContainer;
