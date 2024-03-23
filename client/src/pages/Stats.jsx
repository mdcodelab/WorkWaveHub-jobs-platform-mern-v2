import React from 'react';
import ChartContainer from "../components/ChartContainer";
import StatsContainer from "../components/StatsContainer";
import { useActionData, useLoaderData } from "react-router-dom";
import axios from "axios";

export const loader = async () => {
 try {
   const response = await axios.get("/api/v1/jobs/stats");
   return response.data;
 } catch (error) {
  return error;
 }
}

function Stats() {
  const {defaultStats, monthlyApplication} = useLoaderData();
  
  return (
    <>
      <StatsContainer defaultStats={defaultStats}></StatsContainer>
      <ChartContainer data={monthlyApplication}></ChartContainer>
    </>
  );
}

export default Stats;
