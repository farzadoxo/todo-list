import { useEffect } from "react";
import Todo from "../components/todo";
import { useTodosListState } from "../store";
import { TodoType } from "../types";
import mockData from "./mockData.json";

const TodoList = () => {
  const tasksStore = useTodosListState()

  useEffect(() => {
    tasksStore.setTodo(mockData)
  }, []);


  return (
    <ul className="grid grid-cols-1 w-full items-start sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
      {tasksStore.todosList.map((task: TodoType) => (
        <Todo key={task.id} id={task.id} title={task.title} completed={task.completed} dueDate={task.dueDate} />
      ))}
    </ul>
  );
};

export default TodoList;
