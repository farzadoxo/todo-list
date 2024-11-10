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

  // Separate completed and uncompleted tasks
  const uncompletedTasks = tasksStore.todosList.filter((task: TodoType) => !task.completed);
  const completedTasks = tasksStore.todosList.filter((task: TodoType) => task.completed);

  return (
    <ul className="grid grid-cols-1 w-full items-start sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
      {uncompletedTasks.length > 0 ? (
        uncompletedTasks.map((task: TodoType) => (
          <Todo key={task.id} id={task.id} title={task.title} completed={task.completed} dueDate={task.dueDate} priority={task.priority} />
        ))
      ) : (
        <li>No uncompleted tasks available</li>
      )}

      {completedTasks.length > 0 && (
        <>
          <h2 className="mt-4 p-1 w-full text-gray-700 font-semibold">Completed Tasks</h2>
          {completedTasks.map((task: TodoType) => (
            <Todo key={task.id} id={task.id} title={task.title} completed={task.completed} dueDate={task.dueDate} priority={task.priority} />
          ))}
        </>
      )}
    </ul>
  );
};

export default TodoList;
