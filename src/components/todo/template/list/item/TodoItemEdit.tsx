import React, { useState } from "react";
import styled from "styled-components";
import { disabledDate } from "../../../../../util/function";
import { dateFormat } from "../../../../../util/constants";
import { CheckCircleOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import moment from "moment";

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  color: #119955;
  font-size: 16px;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Icon} {
      display: initial;
    }
  }
`;

const Input = styled.input`
  border: 1px solid #dddddd;
  width: 80%;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const Ul = styled.div`
  width: 20px;
  border: 1px solid #33bb77;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const TodoItemEdit = ({ todo, editTodo, setEditMode }) => {
  const { id, text, deadline } = todo;
  const [todoText, setTodoText] = useState(text);
  const [deadlineToEdit, setdeadlineToEdit] = useState(deadline);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleDeadlineChange = (_, dateString) => {
    setdeadlineToEdit(dateString);
  };

  const hadleSubmitEdit = () => {
    editTodo(id, todoText, deadlineToEdit);
    setEditMode(false);
  };

  return (
    <TodoItemBlock>
      <Ul />
      <Input value={todoText} onChange={handleTodoChange}></Input>
      <DatePicker
        disabledDate={disabledDate}
        defaultValue={moment(deadlineToEdit, dateFormat)}
        format={dateFormat}
        onChange={handleDeadlineChange}
      />
      <Icon>
        <CheckCircleOutlined onClick={hadleSubmitEdit} />
      </Icon>
    </TodoItemBlock>
  );
};

export default TodoItemEdit;
