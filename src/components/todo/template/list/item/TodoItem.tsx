import React, {useState} from "react";
import styled, { css } from "styled-components";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import TodoModal from "../../TodoModal"
import { DatePicker } from 'antd';
import moment from 'moment';

const Remove = styled.div`
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
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  display: flex;
  justify-content: space-between;
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const DeadLine = styled.div`
  margin-right: 50px;
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false)
  const [isFixDeadline, setFixDeadline] = useState(false)
  const { id, text, done, deadline } = todo;
  const handleToggle = (id) => toggleTodo(id);
  const handleRemove = (id) => setRemoveModalVisible(true)
  const handleFixDeadline = () => setFixDeadline(true)
  const dateFormat = 'YYYY/MM/DD';
  return (
<>
    <TodoItemBlock>
      <CheckCircle done={done} onClick={() => handleToggle(id)}>
        {done && <CheckOutlined />}
      </CheckCircle>
      <Text done={done}>
        {text}
        {isFixDeadline?<><DatePicker defaultValue={moment(deadline, dateFormat)} format={dateFormat}/><button>수정</button></>:
        <DeadLine onClick={handleFixDeadline}>{deadline}</DeadLine>}
      </Text>
      <Remove onClick={()=>handleRemove(id)}>
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
    {isRemoveModalVisible && <TodoModal todo={todo} removeTodo={removeTodo} isModalVisible={isRemoveModalVisible} setIsModalVisible={setRemoveModalVisible}/>}
</>
    
  );
};

export default React.memo(TodoItem);
