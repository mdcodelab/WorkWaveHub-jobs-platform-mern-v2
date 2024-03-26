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

    const { search, pathname } = useLocation();
    const navigate = useNavigate();
    console.log(search);
    console.log(pathname);
    
    function handlePageChange(pageNumber) {
        //console.log(pageNumber);
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", pageNumber);  //"page" - query params name on the server
        console.log(searchParams);
        navigate(`${pathname}?${searchParams.toString()}`);
    }


  return (
    <Wrapper>
      <button className="btn prev-btn" onClick={()=> {
        let prevPage=currentPage - 1;
        if(prevPage < 1) {prevPage = 1}
        handlePageChange(prevPage);
      }}>
        <HiChevronDoubleLeft></HiChevronDoubleLeft> Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber)=> {
            return <button className={`btn page-btn ${pageNumber === currentPage ? "set" : ""}`} 
            key={pageNumber} onClick={()=>handlePageChange(pageNumber)}>{pageNumber}</button>
        })}
      </div>
      <button className="btn next-btn" onClick={()=> {
        let nextPage=currentPage+1;
        if(nextPage >= pages.length) {nextPage = pages.length+1}
        handlePageChange(nextPage);
      }}>
        Next <HiChevronDoubleRight></HiChevronDoubleRight>
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
.set {
    background: red !important;
}
`;

export default PageContainer
