import React from 'react';
import styled from "styled-components";
import { FaTimes } from 'react-icons/fa';
import {links} from "./links";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import { useDashboardContext } from '../pages/DashboardLayout';


function SmallSidebar() {
const {showSidebar}=useDashboardContext();
console.log(showSidebar);

  return (
    <Wrapper className={showSidebar ? "show-sidebar sidebar" : "sidebar"}>
      <div className="content">
        <header>
            <Logo></Logo>
        </header>
        <div className="sidebar-content">
            {links.map((link, index)=> {
                const{text, path, icon}=link;
                return <Link to={path} key={index}>{icon} {text}</Link>
            })}
        </div>
      </div>
</Wrapper>
  );
}

const Wrapper = styled.div`
width: 15rem;
height: 100%;
position: fixed;
top: 0; left: 0;
padding: 2rem;


  .sidebar-content a {
        display: block;
        font-size: 1.25rem;
        margin-top: 1.5rem;
        text-transform: capitalize;
    }

    @media (max-width: 992px) {
      .sidebar{
        display: none !important;
      }
    }
  `;

export default SmallSidebar;
