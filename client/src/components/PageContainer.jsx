import React from 'react';
import { useAllJobsContext } from '../pages/AllJobs';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


function PageContainer() {
    const {data}=useAllJobsContext();
    const {numberOfPages, currentPage}=data;
    console.log(numberOfPages, currentPage);

  return (
    <div>
      <h1>Page Container</h1>
    </div>
  )
}

export default PageContainer
