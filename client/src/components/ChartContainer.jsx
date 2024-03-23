import React from 'react';
import AreaChart from "../components/AreaChart";
import BarChart from "../components/BarChart";
import styled from "styled-components";

function ChartContainer({data}) {
    const[barChart, setBarChart]=React.useState(true);

  return (
    <div>
      <h4>Monthly Applications</h4>
      <button type="button" className="btn" onClick={()=> setBarChart(!barChart)}>
        {!barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (<AreaChart data={data}></AreaChart>) : (<BarChart data={data}></BarChart>)}
    </div>
  );
}

export default ChartContainer;
