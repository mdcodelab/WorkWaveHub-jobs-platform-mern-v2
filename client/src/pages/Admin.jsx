import React from 'react';
import { useLoaderData, redirect } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import StatItem from '../components/StatItem';
import { FaSuitcaseRolling } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";

export const loader = async () => {
  try {
    const response = await axios.get("/api/v1/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect("/dashboard");
  }
}

function Admin() {
  const {users, jobs} = useLoaderData();
  
  return (
    <>
      <h3 style={{marginBottom: "2rem"}}>Admin PAge</h3>
      <Wrapper>
        <StatItem title="current users" count={users} color="#e9b949" 
      background="#fcefc7" icon={<FaSuitcaseRolling></FaSuitcaseRolling>}></StatItem>
      <StatItem title="total jobs" count={jobs} color="#647acb" 
      background="#e0e8f9" icon={<FaCalendarCheck></FaCalendarCheck>}></StatItem>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default Admin;
