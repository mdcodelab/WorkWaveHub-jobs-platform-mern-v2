import React from 'react';
import {Outlet} from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default DashboardLayout;
