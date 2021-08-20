import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  deadline: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  var nextIdState = new Date().getTime();
  const [todoState, setTodoState] = useState(initialTodos);
  const [newSort, setSort] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState, newSort]);

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
    let toggleDoneResult = todoState.map((todo: Itodo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodoState(toggleDoneResult);
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    setTodoState((prevState) => prevState.concat(todo));
  };

  const editTodo = (id: number, editedText: string, editedDeadline: string) => {
    let editedResult = todoState.map((todo: Itodo) =>
      todo.id === id
        ? { ...todo, text: editedText, deadline: editedDeadline }
        : todo
    );
    setTodoState(editedResult);
  };

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === undefined) data = "";
    initialTodos = JSON.parse(data);
    if (initialTodos && initialTodos.length >= 1) incrementNextId();
    setTodoState(initialTodos);
  };

  const saveData = () =>
    localStorage.setItem("todos", JSON.stringify(todoState));

  const dateParsing = (deadline) => {
    const parsedDate =
      deadline.split("/").length === 1
        ? deadline.split("-")
        : deadline.split("/");
    const [year, month, date] = parsedDate;
    const dateValue = new Date(year, month, date);
    return dateValue.getTime();
  };

  const sortByDeadLine = () => {
    const result = todoState.sort(
      (prev, next) => dateParsing(prev.deadline) - dateParsing(next.deadline)
    );
    setTodoState(result);
    setSort((prev) => !prev);
  };

  const sortByEnroll = () => {
    const result = todoState.sort((prev, next) => prev.id - next.id);
    setTodoState(result);
    setSort((prev) => !prev);
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    editTodo,
    sortByDeadLine,
    sortByEnroll
  };
};
