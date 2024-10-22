import React, { useState, useEffect, useRef } from 'react';
import Checkbox from "./checkbox";
import { TodoType } from "../types";
import { useTodosListState } from "../store";
import PhotoIconWithModal from "./choosePhotoModal";
import { EditIcon } from "lucide-react";

interface Option {
  icon: React.FC;
  text: string;
  onClick: () => void;
}

interface Options {
  [key: string]: Option;
}

interface DropdownButtonProps {
  onEdit: () => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Options = {
    edit: {
      icon: EditIcon,
      text: "Edit",
      onClick: () => {
        onEdit();
        setIsOpen(false);
      }
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // this function closes the dropdown if user clicks outside the dropdown div
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-center w-10 h-10 m-2 p-0 text-white bg-transparent rounded-full hover:bg-gray-600 transition duration-200"
        onClick={toggleDropdown}
      >
        ...
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.entries(options).map(([key, option]) => (
              <button
                key={key}
                className="flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={option.onClick}
              >
                <option.icon />
                <span className="mx-2">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Todo: React.FC<TodoType> = ({ id, title, completed, dueDate }) => {
  const taskStore = useTodosListState();
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleTodoToggle = () => {
    const updatedTask = {
      id,
      title,
      completed: !isCompleted,
      dueDate,
    };
    taskStore.modifyTodo(id, updatedTask);
    setIsCompleted(!isCompleted);
  };

  const handleImageSelected = (file: File) => {
    console.log('Selected file:', file);
    const imageUrl = URL.createObjectURL(file);
    console.log("image url: ", imageUrl)
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTask = {
      id,
      title: editedTitle,
      completed: isCompleted,
      dueDate,
    };
    // this is should be replaced with api call and the result should be given to the modifyTodo method
    taskStore.modifyTodo(id, updatedTask);
    setIsEditing(false);
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
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="ml-2 bg-transparent border-b border-gray-600 focus:outline-none"
            autoFocus
          />
        ) : (
          <span className={`ml-2 ${isCompleted ? 'line-through font-light text-gray-200' : ''}`}>
            {title}
          </span>
        )}
      </div>
      {isEditing ? (
        <button
          onClick={handleSave}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      ) : (
        <>
          <PhotoIconWithModal
            size={32}
            color="blue"
            onImageSelected={handleImageSelected}
          />
          <DropdownButton onEdit={handleEdit} />
        </>
      )}
    </li>
  );
}

export default Todo;
