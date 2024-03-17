import React from 'react';
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import { useLoaderData } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const {data} = await axios.get("/api/v1/jobs");
    return {data};
  } catch (error) {
    toast.error("Error")
    return error;
  }
}


function AllJobs() {
  const {data}=useLoaderData();
  console.log({data});

  return (
    <div>
      <h1>All Jobs</h1>
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </div>
  );
}

export default AllJobs;
