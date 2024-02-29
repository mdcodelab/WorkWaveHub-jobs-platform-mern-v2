import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {RouterProvider, createBrowserRouter } from "react-router-dom";
import {AddJob, AllJobs, Dashboard, EditJob, Error, HomeLayout, 
  Landing, Login, Profile, Register, Stats, Admin} from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Landing></Landing> },
      { path: "register", element: <Register></Register> },
      { path: "login", element: <Login></Login> },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        
        children: [
          { index: true, element: <AddJob /> },
          { path: "stats", element: <Stats></Stats> },
          { path: "all-jobs", element: <AllJobs></AllJobs> },
          { path: "profile", element: <Profile></Profile> },
          { path: "admin", element: <Admin></Admin>}
        ],
      },
    ],
  },
]);

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();


function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
