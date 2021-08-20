import { useTodo } from "./TodoService";
import TodoTemplate from "./template/TodoTemplate";
import TodoHead from "./template/head/TodoHead";
import TodoList from "./template/list/TodoList";
import TodoCreate from "./template/create/TodoCreate";
import TodoFooter from "./template/footer/TodoFooter";
import TodoSorting from "./template/list/TodoSorting";
const TodoContainer = () => {
  const {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    editTodo,
    sortByDeadLine,
    sortByEnroll
  } = useTodo();

  return (
    <>
      <TodoTemplate>
        <TodoHead />
        <TodoCreate
          nextId={nextIdState}
          createTodo={createTodo}
          incrementNextId={incrementNextId}
        />
        <TodoSorting
          sortByDeadLine={sortByDeadLine}
          sortByEnroll={sortByEnroll}
        />
        <TodoList
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
          todoState={todoState}
        />
        <TodoFooter todos={todoState} />
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
