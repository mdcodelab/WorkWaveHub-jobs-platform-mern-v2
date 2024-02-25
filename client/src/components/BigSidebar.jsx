import React from 'react';
import styled from "styled-components";
import {links} from "./links";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import { IoMdClose } from "react-icons/io";
import { useDashboardContext } from '../pages/DashboardLayout';

function BigSidebar() {
  return (
    <Wrapper>
      <div className="button">
        <IoMdClose></IoMdClose>
      </div>
      <div className="container">
        {links.map((link, index) => {
            const {text, path, icon}=link;
            return <Link to={path} key={index}>{text} {icon}</Link>
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
display: none;
`;

export default BigSidebar;
