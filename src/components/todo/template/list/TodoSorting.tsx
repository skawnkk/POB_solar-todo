import React from "react";
import styled from "styled-components";
import { OrderedListOutlined, UnorderedListOutlined } from "@ant-design/icons";

const SortBlock = styled.div`
  display: flex;
  align-content: center;
  margin-top: 20px;
  margin-left: 20px;
  p {
    margin: 0 20px 0 10px;
  }
`;

const SortIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
  cursor: pointer;
`;

const TodoSorting = ({ sortByDeadLine, sortByEnroll }) => {
  return (
    <SortBlock>
      <SortIcon onClick={sortByEnroll}>
        <OrderedListOutlined />
        <p>등록순서</p>
      </SortIcon>

      <SortIcon onClick={sortByDeadLine}>
        <UnorderedListOutlined />
        <p>마감기한</p>
      </SortIcon>
    </SortBlock>
  );
};

export default TodoSorting;
