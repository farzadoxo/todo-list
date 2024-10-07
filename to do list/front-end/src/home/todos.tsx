import { useEffect } from "react";
import Todo from "../components/todo";
import { useTodosListState } from "../store";
import { TodoType } from "../types";
import api from "../axios";

const TodoList = () => {
  const tasksStore = useTodosListState();

  // Fetch tasks function
  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/todos/");

      if (Array.isArray(response.data.todos)) { // Ensure response.data is an array
        tasksStore.setTodo(response.data.todos); // Assuming response.data contains the todos
        console.log("Fetched tasks:", response.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // useEffect to fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array means this will run once when the component mounts

  // Render the task list or a message if no tasks exist
  return (
    <ul className="grid grid-cols-1 w-full items-start sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
      {tasksStore.todosList.length > 0 ? ( // Check if there are tasks
        tasksStore.todosList.map((task: TodoType) => (
          <Todo key={task.id} id={task.id} title={task.title} completed={task.completed} dueDate={task.dueDate} />
        ))
      ) : (
        <li>No tasks available</li> // Optional: display a message if no tasks exist
      )}
    </ul>
  );
};

export default TodoList;
