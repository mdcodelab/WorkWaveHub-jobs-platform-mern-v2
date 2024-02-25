import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { links } from "./links";
import { NavLink } from "react-router-dom";

function NavLinks() {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div>
      {links.map((link) => {
        const { text, path, icon } = link;
        // admin user

        return (
          <NavLink
            to={path}
            key={text}
            onClick={toggleSidebar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
