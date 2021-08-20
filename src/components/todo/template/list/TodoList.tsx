import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import styled from "styled-components";
import { Itodo } from "../../TodoService";
import TodoItem from "./item/TodoItem";
import TodoSorting from "./TodoSorting";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

interface TodoListProps {
  todoState: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, editedText: string, editedDeadline: string) => void;
}

const TodoList = ({
  toggleTodo,
  removeTodo,
  editTodo,
  todoState
}: TodoListProps) => {
  return (
    <TodoListBlock>
      {todoState &&
        todoState.map((todo) => (
          <TodoItem
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            editTodo={editTodo}
            key={todo.id}
            todo={todo}
          />
        ))}
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
