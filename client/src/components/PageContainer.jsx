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
            return <button className={`btn page-btn ${pageNumber === currentPage ? "active" : ""}`} 
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

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
  }
  .page-btn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    border-radius: var(--border-radius);
    cursor:pointer:
  }
  .active{
    background:var(--primary-500);
        color: var(--white);

  }
  .prev-btn,.next-btn{
    background: var(--background-secondary-color);
    border-color: transparent;
        border-radius: var(--border-radius);

    width: 100px;
    height: 40px;
        color: var(--primary-500);
text-transform:capitalize;
letter-spacing:var(--letter-spacing);
display:flex;
align-items:center;
justify-content:center;
gap:0.5rem;
cursor:pointer;
  }
  .prev-btn:hover,.next-btn:hover{
    background:var(--primary-500);
        color: var(--white);
        transition:var(--transition);
  }
.dots{
  display:grid;
  place-items:center;
  cursor:text;
}
`;

export default PageContainer
