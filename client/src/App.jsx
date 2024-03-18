import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddJob,
  AllJobs,
  Dashboard,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
  Admin,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import {action as loginAction} from "./pages/Login";
import {loader as dashboardLoader} from "./pages/Dashboard";
import {action as addJobAction} from "./pages/AddJob";
import {loader as allJobsLoader} from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Landing></Landing> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      { path: "login", element: <Login></Login>, action: loginAction },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>, loader: dashboardLoader,

        children: [
          { index: true, element: <AddJob />, action: addJobAction},
          { path: "stats", element: <Stats></Stats> },
          { path: "all-jobs", element: <AllJobs></AllJobs>, loader:allJobsLoader },
          { path: "profile", element: <Profile></Profile> },
          { path: "admin", element: <Admin></Admin> },
          {path: "edit-job/:id", element: <EditJob/>, action: editJobAction, loader: editJobLoader}
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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
