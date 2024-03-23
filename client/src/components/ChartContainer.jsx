import React from 'react';
import AreaChartComponent from "../components/AreaChart";
import BarChartComponent from "../components/BarChart";
import styled from "styled-components";

function ChartContainer({data}) {
    const[barChart, setBarChart]=React.useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={()=> setBarChart(!barChart)}>
        {!barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (<AreaChartComponent data={data}></AreaChartComponent>) 
      : (<BarChartComponent data={data}></BarChartComponent>)}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default ChartContainer;
