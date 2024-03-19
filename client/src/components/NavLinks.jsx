import React from "react";
import { useDashboardContext } from "../pages/Dashboard";
import { links } from "./links";
import { NavLink } from "react-router-dom";

function NavLinks({ isBigSidebar }) {
  const { user, toggleSidebar } = useDashboardContext();
  const{role}=user;

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        // admin user
        if(path === "admin" && role !== "admin") {
          return
        }
        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            className="nav-link">
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
