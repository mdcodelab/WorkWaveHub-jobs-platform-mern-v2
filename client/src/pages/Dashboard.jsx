
import React from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BigSidebar from "../components/BigSidebar";
import SmallSidebar from "../components/SmallSidebar";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

import { useState, createContext, useContext } from "react";
const DashboardContext = createContext();

export const loader = async () => {
  
  try {
    const response = await axios.get("/api/v1/users/current-user");
    const {user}=response.data
    return user
  } catch (error) {
    return redirect("/");
  }
}

const Dashboard = () => {
  const user=useLoaderData();
console.log(user.name);
  //const user={name: "john"}
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const navigate=useNavigate();
  const logoutUser = async () => {
    navigate("/");
    await axios.get("/api/v1/auth/logout");
    toast.success("Logging out...")
  };


  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);


const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default Dashboard;
