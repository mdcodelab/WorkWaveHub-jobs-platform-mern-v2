import React from 'react';
import {Outlet} from "react-router-dom";
import SmallSidebar from '../components/SmallSidebar';
import BigSidebar from '../components/BigSidebar';
import Navbar from '../components/Navbar';
import styled from "styled-components";
import {createContext, useContext} from "react";

const DashboardContext = createContext();

function DashboardLayout() {
//temp
  const user={name: "john"};

  const[showSidebar, setShowSidebar]=React.useState(false);
  
  const[darkTheme, setDarkTheme]=React.useState(false);

  function toggleDarkTheme() {
    console.log("dark theme");
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  async function logoutUser () {
    console.log("logout user")
  }


  return (
    <DashboardContext.Provider value={{
      user, showSidebar, setShowSidebar, darkTheme, setDarkTheme, toggleDarkTheme, toggleSidebar
    }}>
    <Wrapper className="dashboard">
      <BigSidebar></BigSidebar>
      <SmallSidebar></SmallSidebar>
      <div>
        <Navbar></Navbar>
        <div className="dashboard-page">
          <Outlet></Outlet>
        </div>
      </div>
    </Wrapper>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);

const Wrapper = styled.div`
display: grid;
grid-template-columns: 1fr;

.dashboard-page {
  width: 90vw;
  margin: 0 auto;
  padding: 2rem 0;
}

@media (min-width: 992px) {
  .dashboard {
    grid-template-columns: auto 1fr;
  }
  .dashboard {
    width: 90%;
  }
}
`;

export default DashboardLayout;
