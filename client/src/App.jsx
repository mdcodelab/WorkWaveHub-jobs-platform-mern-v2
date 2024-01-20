import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {RouterProvider, createBrowserRouter } from "react-router-dom";
import {AddJob, AllJobs, DashboardLayout, EditJob, Error, HomeLayout, Landing, Login, Profile, Register, Stats} from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>
  }, {
    path: "/about",
    element: (<div><h1>About page</h1></div>)
  }
])

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
