import Checkbox from "./checkbox";
import { TodoType } from "../types";
import { useTodosListState } from "../store";
import React from 'react';
import PhotoIconWithModal from "./choosePhotoModal";

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

  const handleImageSelected = (file: File) => {
    console.log('Selected file:', file);
    // Here you can perform actions with the selected file, such as:
    // - Uploading it to a server
    // - Displaying it in the UI
    // - Storing it in state or context
    // For example:
    const imageUrl = URL.createObjectURL(file);
    console.log("image url: ", imageUrl)
  };

  return (
    <li
      key={id}
      className={`flex items-center justify-between p-3 m-1 min-w-14 font-bold dark:text-white text-lg rounded border border-gray-600 ${isCompleted ? 'completeTask' : ''}`}
    >
      <div className="flex items-center flex-grow">
        <Checkbox
          id={id}
          checked={isCompleted}
          onChange={handleTodoToggle}
        />
        <span className={`ml-2 ${isCompleted ? 'line-through font-light text-gray-200' : ''}`}>
          {title}
        </span>
      </div>
      <PhotoIconWithModal
        size={32}
        color="blue"
        onImageSelected={handleImageSelected}
      />
    </li>
  );
}

export default Todo;
