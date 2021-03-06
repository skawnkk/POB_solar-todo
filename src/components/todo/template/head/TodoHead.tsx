import React, { useState, useEffect } from "react";
import styled from "styled-components";
const TodoHeadTimeBlock = styled.div`
  padding-top: 10px;
`;
const TodoHeadDateBlock = styled.div`
  display: flex;
  justify-content: center;
  color: #119955;
  font-size: 10px;
  padding-top: 10px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const ClockText = styled.div`
  font-size: 18px;
  color: #119955;
  padding-left: 10px;
`;
const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TodoHead = () => {
  const currentTime = new Date().getTime();
  const [time, setTime] = useState(currentTime);
  const today = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "medium"
  }).format(time);
  const [day, date, month, year, , clock] = today.split(" ");

  useEffect(() => {
    let timer = setTimeout(() => setTime(time + 1000), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return (
    <>
      <TodoHeadTimeBlock>
        <ClockText>{clock}</ClockText>
      </TodoHeadTimeBlock>
      <TodoHeadDateBlock>
        <DayText>{day}</DayText>
        <DateText>{month + " " + date + ", " + year}</DateText>
      </TodoHeadDateBlock>
    </>
  );
};

export default React.memo(TodoHead);
