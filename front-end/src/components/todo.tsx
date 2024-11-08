import React, { useState, useEffect, useRef } from 'react';
import Checkbox from "./checkbox"; // Ensure Checkbox has correct props
import { TodoType } from "../types"; // Ensure TodoType is defined correctly
import { useTodosListState } from "../store";
import PhotoIconWithModal from "./choosePhotoModal";
import { DeleteIcon, EditIcon } from "lucide-react";

interface Option {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  onClick: () => void;
}

interface Options {
  [key: string]: Option;
}

interface DropdownButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Options = {
    edit: {
      icon: EditIcon,
      text: "Edit",
      onClick: () => {
        onEdit();
        setIsOpen(false);
      }
    },
    delete: {
      icon: DeleteIcon,
      text: "Delete",
      onClick: () => {
        onDelete();
        setIsOpen(false);
      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
        className="flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-gray-200 transition duration-200 focus:outline-none"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-gray-600">...</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(options).map(([key, option]) => (
              <button
                key={key}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={option.onClick}
              >
                <option.icon className="w-4 h-4 mr-2" />
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Todo: React.FC<TodoType> = ({ id, title, completed, dueDate }) => {
  const taskStore = useTodosListState();
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

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
    console.log("image url:", imageUrl);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    taskStore.deleteTodo(id);
    console.log("deleteTodo");
  };

  const handleSave = () => {
    const updatedTask = {
      id,
      title: editedTitle,
      completed: isCompleted,
      dueDate,
    };
    taskStore.modifyTodo(id, updatedTask); // Assuming this updates the state correctly
    setIsEditing(false);
  };

  return (
    <li
      key={id}
      className={`flex items-center justify-between p-4 my-1 bg-white rounded-lg shadow-md transition-all duration-300 ${isCompleted ? 'bg-green-100' : 'bg-white'} border border-gray-300`}
    >
      <div className="flex items-center flex-grow">
        <Checkbox
          id={id}
          checked={isCompleted}
          onChange={handleTodoToggle}
          className="mr-3"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow p-2 border-b border-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
            autoFocus
          />
        ) : (
          <span className={`ml-2 text-lg ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {title}
          </span>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={handleSave}
          className="px-3 py-1 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
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
          <DropdownButton onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </li>
  );
};

export default Todo;
