import React from 'react';
import { useAllJobsContext } from '../pages/AllJobs';
import styled from "styled-components";
import Job from "./Job";

function JobsContainer() {
  const {data}=useAllJobsContext();
  const{jobs}=data;

  if(!jobs.length === 0) {
    return <h2 style={{textAlign: "center"}}>No jobs to display.</h2>
  }

  return (
    <Wrapper className="jobs">
      {jobs.map((job, index)=> {
        return <Job key={index} {...job}></Job>
      })}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;

  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default JobsContainer;
