
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BigSidebar from "../components/BigSidebar";
import SmallSidebar from "../components/SmallSidebar";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import { useState, createContext, useContext } from "react";
const DashboardContext = createContext();



const Dashboard = () => {

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

  const logoutUser = async () => {
    console.log("logout user");
  };

  //get currentUser
  const [user, setUser]=React.useState({});
  const [loading, setLoading] = React.useState(true); 

  const navigate = useNavigate();
  // const getCurrentUser = async () => {
  //   try {
  //     const response = await axios.get("/api/v1/users/current-user");
  //     console.log(response.data);
  //     setUser(response.data);
  //   } catch (error) {
  //     navigate("/");
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/current-user");
        console.log(response.data);
        setUser(response.data);
        navigate("/dashboard");
      } catch (error) {
        navigate("/");
        console.error(error);
      } 
      finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

console.log(user);

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
              <Outlet />
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
