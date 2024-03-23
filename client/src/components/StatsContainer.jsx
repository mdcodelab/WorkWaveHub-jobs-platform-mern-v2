import React from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatItem from "./StatItem";
import styled from "styled-components";

function StatsContainer({defaultStats}) {
    //console.log(defaultStats);

    const stats = [
      {
        title: "pending applications",
        count: defaultStats?.pending || 0,
        icon: <FaSuitcaseRolling />,
        color: "#f59e0b",
        background: "#fef3c7",
      },
      {
        title: "interviews scheduled",
        count: defaultStats?.interview || 0,
        icon: <FaCalendarCheck />,
        color: "#647acb",
        background: "#e0e8f9",
      },
      {
        title: "jobs declined",
        count: defaultStats?.declined || 0,
        icon: <FaBug />,
        color: "#d66a6a",
        background: "#ffeeee",
      },
    ];
  return (
    <Wrapper>
      {stats.map((item)=> {
        return <StatItem key={item.title} {...item}></StatItem>
      })}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default StatsContainer;
