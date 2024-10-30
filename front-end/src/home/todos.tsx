import { useEffect } from "react";
import Todo from "../components/todo";
import { useTodosListState } from "../store";
import { TodoType } from "../types";
import api from "../axios";

const TodoList = () => {
  const tasksStore = useTodosListState();

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/todos/");

      if (Array.isArray(response.data.todos)) {
        tasksStore.setTodo(response.data.todos);
        console.log("Fetched tasks:", response.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul className="grid grid-cols-1 w-full items-start sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
      {tasksStore.todosList.length > 0 ? (
        tasksStore.todosList.map((task: TodoType) => (
          <Todo key={task.id} id={task.id} title={task.title} completed={task.completed} dueDate={task.dueDate} />
        ))
      ) : (
        <li>No tasks available</li>
      )}
    </ul>
  );
};

export default TodoList;
