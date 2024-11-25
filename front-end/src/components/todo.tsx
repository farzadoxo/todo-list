import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import Checkbox from "./checkbox";
import { TodoType } from "../types";
import { useTodosListState } from "../store";
import AddPhoto from './addPhotoModal';
import { DeleteIcon, EditIcon } from "lucide-react";
import 'react-responsive-modal/styles.css';
import CustomDatePicker from './customDatePicker';
import api from '@/axios';
import { CustomConfirmModal } from './customModals';

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
        className="flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 focus:outline-none"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-gray-600 dark:text-gray-300">...</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(options).map(([key, option]) => (
              <button
                key={key}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
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

const Todo: React.FC<TodoType> = ({ id, title, completed, dueDate, priority }) => {
  const taskStore = useTodosListState();
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedDueDate, setEditedDueDate] = useState<string | null>(dueDate);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // State for saving
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleTodoToggle = () => {
    const updatedTask = {
      id,
      title,
      completed: !isCompleted,
      dueDate,
      priority,
    };
    try {
      taskStore.modifyTodo(id, updatedTask);
      api.patch(`/api/todos/${id}`, updatedTask)
        .then(response => console.log(response));
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error(error);
    }
  };


  const handleEdit = () => {
    setIsEditing(true);
  };

  // Open delete confirmation modal
  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true); // Open confirmation modal
  };

  // Confirm deletion
  const confirmDelete = async () => {
    try {
      taskStore.deleteTodo(id); // Call delete function
      await api.delete(`api/todos/${id}`);
    } catch (error) {
      console.error(error);
    }
    setIsDeleteModalOpen(false); // Close modal after deletion
  };

  const formattedDueDate = editedDueDate && format(editedDueDate, "yyyy-MM-dd");

  const handleSave = async () => { // handle edit save
    setIsSaving(true); // Set saving state to true
    const updatedTask = {
      id,
      title: editedTitle,
      completed: isCompleted,
      dueDate: formattedDueDate,
      priority,
    };

    try {
      taskStore.modifyTodo(id, updatedTask);
      await api.patch(`/api/todos/${id}`, updatedTask);
    } catch (error) {
      console.error("error in updating task", error);
    }

    setIsSaving(false); // Reset saving state
    setIsEditing(false); // Exit edit mode
  };

  return (
    <>
      <li
        key={id}
        className={`flex items-center justify-between p-4 my-1 mx-2 rounded-lg shadow-md transition-all duration-300 border border-gray-300 
          ${isCompleted ? 'bg-green-100' : 'bg-white'} 
          dark:bg-gray-800 dark:border-gray-700 ${isCompleted ? 'dark:bg-green-900' : ''} priority-${priority}`}
      >
        <div className="flex items-center flex-grow">
          {isEditing ? (
            <form className="flex flex-row space-x-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                autoFocus
              />
              <CustomDatePicker selectedDate={editedDueDate as Date | null} onDateChange={setEditedDueDate} />
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={`px-3 py-1 rounded transition duration-200 ${isSaving ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </form>
          ) : (
            <>
              <Checkbox
                id={id}
                checked={isCompleted}
                onChange={handleTodoToggle}
                className="mr-3"
              />
              <span className={`ml-2 text-lg ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'} dark:text-gray-300`}>
                {title}
              </span>
            </>
          )}
        </div>

        {!isEditing && (
          <>
            <AddPhoto />
            <DropdownButton onEdit={handleEdit} onDelete={handleDeleteModalOpen} />
          </>
        )}
      </li>

      <CustomConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Task?"
        content={<p>Are you sure you want to delete this todo item?</p>}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Todo;
