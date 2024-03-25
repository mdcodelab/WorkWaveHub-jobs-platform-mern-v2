import React from 'react';
import { useAllJobsContext } from '../pages/AllJobs';
import styled from "styled-components";
import Job from "./Job";
import PageContainer from "./PageContainer";

function JobsContainer() {
  const {data}=useAllJobsContext();
  const{jobs, totalJobs, currentPage, numberOfPages}=data;
  //console.log(jobs);

  if(jobs.length === 0) {
    return <h4 style={{textAlign: "center"}}>No jobs to display...</h4>
  }

  return (
    <Wrapper>
    <h5>{totalJobs} job{jobs.length>1 && "s"} found</h5>
      <div className="jobs">
        {jobs.map((job, index) => {
          return <Job key={index} {...job}></Job>;
        })}
      </div>
        {numberOfPages > 1 && <PageContainer></PageContainer>}
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
    text-transform: none;
  }

  @media (min-width: 1120px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default JobsContainer;
