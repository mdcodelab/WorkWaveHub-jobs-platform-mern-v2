import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BigSidebar from "../components/BigSidebar";
import SmallSidebar from "../components/SmallSidebar";
import styled from "styled-components";

import { useState, createContext, useContext } from "react";
const DashboardContext = createContext();



const Dashboard = () => {
  // temp
  const user = { name: "john" };

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
