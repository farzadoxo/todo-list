import Checkbox from "./checkbox";
import { TodoType } from "../types";
import { useTodosListState } from "../store";
import React from 'react';

const Todo: React.FC<TodoType> = ({ id, title, completed, dueDate }) => {
  const taskStore = useTodosListState();
  const [isCompleted, setIsCompleted] = React.useState(completed);

  const handleTodoToggle = () => {
    const updatedTask = {
      id,
      title,
      completed: !isCompleted,
      dueDate,
    };
    taskStore.modifyTodo(id, updatedTask);
    setIsCompleted(!isCompleted); // Update local state
  };

  return (
    <li
      key={id}
      className={`p-3 m-1 min-w-14 font-bold dark:text-white text-lg rounded border border-gray-600 ${isCompleted ? 'completeTask ' : ''}`}
    >
      <Checkbox
        id={id}
        checked={isCompleted}
        onChange={handleTodoToggle}
      />
      <span className={isCompleted ? 'line-through' : ''}>
        {title}
      </span>
    </li>
  );
}

export default Todo;
