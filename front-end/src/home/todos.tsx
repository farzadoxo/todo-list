import { useEffect, useState } from "react";
import mockData from "./mockData.json"
import { Todo } from "../types";
import Checkbox from "../components/checkbox";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(mockData);
  }, []);

  const handleTodoToggle = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <ul className="grid grid-cols-1 w-full items-start sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
      {todos.map((todo: Todo) => (
        <li
          key={todo.id}
          className={`p-3 m-1 min-w-14 font-bold text-white text-lg rounded border border-gray-600 ${todo.completed ? 'completeTask' : ''
            }`}
        >
          <Checkbox
            id={todo.id}
            checked={todo.completed}
            onChange={() => handleTodoToggle(todo.id)}
          />
          <span className={todo.completed ? 'line-through' : ''}>
            {todo.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
