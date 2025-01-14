import { useEffect } from "react";
import Todo from "../components/todo";
import { useTodosListState } from "../store";
import { TodoType } from "../types";
import api from "../axios";
import { useLoggedInUser } from "@/components/hooks/AuthHooks";

const TodoList = () => {
  const tasksStore = useTodosListState();
  const email = useLoggedInUser()

  const fetchTasks = async () => {
    let url: string;
    if (email) {

      url = `/api/todos/${email ?? 'none'}`
      console.log(url)
      console.log(email)
      try {
        const response = await api.get(url);

        if (Array.isArray(response.data.todos)) {
          tasksStore.setTodo(response.data.todos);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }

    }
    else {
      console.log("no email ")
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Separate completed and uncompleted tasks
  const uncompletedTasks = tasksStore.todosList.filter((task: TodoType) => !task.completed);
  const completedTasks = tasksStore.todosList.filter((task: TodoType) => task.completed);

  return (
    <ul className="grid grid-cols-1 w-full items-start">
      {uncompletedTasks.length > 0 ? (
        uncompletedTasks.map((task: TodoType) => (
          <Todo key={task.id} id={task.id} title={task.title} completed={task.completed} dueDate={task.dueDate} priority={task.priority} owner={email} />
        ))
      ) : (
        <li>No uncompleted tasks available</li>
      )}

      {completedTasks.length > 0 && (
        <>
          <h2 className="mt-4 p-1 w-full text-gray-700 font-semibold">Completed Tasks</h2>
          {completedTasks.map((task: TodoType) => (
            <Todo key={task.id} id={task.id} title={task.title} completed={task.completed} dueDate={task.dueDate} priority={task.priority} owner={email} />
          ))}
        </>
      )}
    </ul>
  );
};

export default TodoList;
