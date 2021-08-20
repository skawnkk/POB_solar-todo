import React, { useState } from "react";
import styled, { css } from "styled-components";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import TodoModal from "../../TodoModal";
import TodoItemEdit from "./TodoItemEdit";

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

const TodoManager = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, editedText: string, editedDeadline: string) => void;
  todo: Itodo;
}

const TodoItem = ({
  toggleTodo,
  removeTodo,
  editTodo,
  todo
}: TodoItemProps) => {
  const { id, text, done, deadline } = todo;
  const [isEditMode, setEditMode] = useState(false); //편집모드 여부
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false); //삭제확인모달

  const handleToggle = (id) => toggleTodo(id);
  const handleRemove = () => setRemoveModalVisible(true);
  return !isEditMode ? (
    <>
      <TodoItemBlock>
        <CheckCircle done={done} onClick={() => handleToggle(id)}>
          {done && <CheckOutlined />}
        </CheckCircle>
        <Text done={done}>
          <span>{text}</span>
          <DeadLine>{deadline}</DeadLine>
        </Text>
        <TodoManager>
          <Icon>
            <EditOutlined onClick={() => setEditMode(true)} />
          </Icon>
          <Icon>
            <DeleteOutlined onClick={() => handleRemove(id)} />
          </Icon>
        </TodoManager>
      </TodoItemBlock>
      {isRemoveModalVisible && (
        <TodoModal
          todo={todo}
          removeTodo={removeTodo}
          isModalVisible={isRemoveModalVisible}
          setIsModalVisible={setRemoveModalVisible}
        />
      )}
    </>
  ) : (
    <TodoItemEdit todo={todo} editTodo={editTodo} setEditMode={setEditMode} />
  );
};

export default React.memo(TodoItem);
