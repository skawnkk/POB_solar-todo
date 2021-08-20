import React, { useState } from "react";
import styled from "styled-components";
import { OrderedListOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import TodoItem from "./item/TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const SortBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
`;
interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, editedText: string, editedDeadline: string) => void;
}

const TodoList = ({
  toggleTodo,
  removeTodo,
  editTodo,
  todos
}: TodoListProps) => {
  const [todoList, setTodoList] = useState(todos);
  const dateParsing = (deadline) => {
    const [year, month, date] = deadline.split("-");
    const dateValue = new Date(year, month, date);
    return dateValue.getTime();
  };

  const sortByEnroll = () => {
    const result = todos.sort((prev, next) => prev.id - next.id);
    setTodoList(result);
  };

  const sortByDeadLine = () => {
    const result = todos.sort(
      (prev, next) => dateParsing(prev.deadline) - dateParsing(next.deadline)
    );
    setTodoList(result);
  };
  return (
    <>
      <SortBlock>
        <OrderedListOutlined onClick={sortByEnroll} />
        <UnorderedListOutlined onClick={sortByDeadLine} />
      </SortBlock>
      <TodoListBlock>
        {todoList &&
          todos.map((todo) => (
            <TodoItem
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
              editTodo={editTodo}
              key={todo.id}
              todo={todo}
            />
          ))}
      </TodoListBlock>
    </>
  );
};

export default React.memo(TodoList);
