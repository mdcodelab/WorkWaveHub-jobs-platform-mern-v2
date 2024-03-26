import React from 'react';
import { useAllJobsContext } from '../pages/AllJobs';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


function PageContainer() {
    const {data}=useAllJobsContext();
    const {numberOfPages, currentPage}=data;
    console.log(numberOfPages, currentPage);
    const pages = [];
    for(let i =1; i<= numberOfPages; i++) {
        pages.push(i);
    }
    console.log(pages);

  return (
    <div>
      <button className="btn prev-btn">
        <HiChevronDoubleLeft></HiChevronDoubleLeft> Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber)=> {
            return <button className={`btn page-btn ${pageNumber === currentPage? "active" : ""}`} 
            key={pageNumber}>{pageNumber}</button>
        })}
      </div>
      <button className="btn next-btn">
        Next <HiChevronDoubleRight></HiChevronDoubleRight>
      </button>
    </div>
  );
}

export default PageContainer
