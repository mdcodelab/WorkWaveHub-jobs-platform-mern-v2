import React from 'react';
import { FaAlignLeft } from "react-icons/fa";
import styled from "styled-components";
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

function Navbar() {
  const { toggleSidebar } = useDashboardContext();
  const [showLogo, setLogo] = React.useState(window.innerWidth <= 992);

React.useEffect(() => {
const handleResize = () => {
    setLogo(window.innerWidth<=992)
}
window.addEventListener("resize", handleResize);
return () =>window.removeEventListener("resize", handleResize);
}, []);

  return (
    <Wrapper className="nav">
      <div className="nav-center">
        <FaAlignLeft
          className="toggle-btn"
          onClick={toggleSidebar}
          style={{
            fontSize: "2rem",
            color: "var(--primary-500",
            cursor: "pointer",
          }}
        ></FaAlignLeft>
        {showLogo && <Logo></Logo>}
        <h4 className="none">Dashboard</h4>
        <div className="btn-container">toggle/logout</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
border: 2px solid red;
  .nav-center {
    height: 6rem;
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--background-secondary-color);
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 992px) {
    .none {
        display: none;
    }
  }

  @media (min-width: 992px) {
    .nav {
        position: sticky;
        top: 0;
    }
  }
`;

export default Navbar;

