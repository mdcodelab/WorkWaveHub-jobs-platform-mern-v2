import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {RouterProvider, createBrowserRouter } from "react-router-dom";
import {AddJob, AllJobs, DashboardLayout, EditJob, Error, HomeLayout, Landing, Login, Profile, Register, Stats} from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: (<Error></Error>),
    children: [
      {
        index: true,
        element: (<Landing></Landing>)
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "dashboard",
        element: <DashboardLayout></DashboardLayout>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
