import { useState, useRef } from 'react'
import styled, { css } from "styled-components";
import { CheckOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { DatePicker } from 'antd';
import moment from 'moment';

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Icon} {
      display: initial;
    }
  }
`;

const TodoItemEdit = ({todo, setEditMode}) => {
  const [contentToEdit, setContentToEdit] = useState(todo)
  const {id, text, done, deadline} =contentToEdit
  const todoInputRef = useRef(text)
  const dateFormat = 'YYYY/MM/DD';
  const handleEditTodo = () => {
    setContentToEdit(prevTodo=>({...prevTodo, text: todoInputRef.current.value}))
    setEditMode(false)
  }

  const handleDeadlineChange = (dateString) => {
    setContentToEdit(prevTodo => ({...prevTodo, deadline: dateString}))
  }


  return (
  <TodoItemBlock>
    {done && <CheckOutlined />}
    <input ref={todoInputRef}>{text}</input>
    <DatePicker defaultValue={moment(deadline, dateFormat)} format={dateFormat} onChange={handleDeadlineChange}/>
    <Icon><CheckCircleOutlined onClick={()=>handleEditTodo(id)}/></Icon>
  </TodoItemBlock>
  )
}

export default TodoItemEdit;