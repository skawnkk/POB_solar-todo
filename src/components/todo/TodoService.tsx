import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  deadline: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);

  var nextIdState = 0;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

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
      prevState.filter((todo: Itodo) => todo.id === id)
    );
  };

  const createTodo = (todo: Itodo) => {
    const nextId = todoState.length + 1;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId
      })
    );
  };

  const loadData = () => {
    //localStorage.removeItem('todos')
    let data = localStorage.getItem("todos");
    //if (data === undefined) data = ""; //이건 뭐지, 빈 배열이 아니라 undefined?
    initialTodos = JSON.parse(data); //data!  (???)
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo
  };
};
