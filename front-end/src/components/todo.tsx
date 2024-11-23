import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import Checkbox from "./checkbox";
import { TodoType } from "../types";
import { useTodosListState } from "../store";
import PhotoIconWithModal from "./choosePhotoModal";
import { DeleteIcon, EditIcon } from "lucide-react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CustomDatePicker from './customDatePicker';
import api from '@/axios';

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

const Todo: React.FC<TodoType> = ({ id, title, completed, dueDate, priority }) => {
  const taskStore = useTodosListState();
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedDueDate, setEditedDueDate] = useState<string | null>(dueDate);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
      const response = api.patch(`/api/todos/${id}`, updatedTask)
      console.log(response)
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error(error)
    }
  };

  const handleImageSelected = (file: File) => {
    console.log('Selected file:', file);
    const imageUrl = URL.createObjectURL(file);
    console.log("image url:", imageUrl);
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
      const response = api.delete(`api/todos/${id}`)
      console.log("deleteTodo response", response);
    } catch (error) {
      console.error(error)
    }
    setIsDeleteModalOpen(false); // Close modal after deletion
  };

  const formattedDueDate = editedDueDate && format(editedDueDate, "yyyy-MM-dd");
  const handleSave = async () => { // handle edit save
    const updatedTask = {
      id,
      title: editedTitle,
      completed: isCompleted,
      dueDate: formattedDueDate,
      priority,
    };
    try {

      taskStore.modifyTodo(id, updatedTask);

      const response = await api.patch(`/api/todos/${id}`)
      console.log(response)

    } catch (error) {
      console.error("error in updating task", error)
    }
    setIsEditing(false);
  };

  return (
    <>
      <li
        key={id}
        className={`flex items-center justify-between p-4 my-1 bg-white rounded-lg shadow-md transition-all duration-300 ${isCompleted ? 'bg-green-100' : 'bg-white'} border border-gray-300 priority-${priority}`}
      >
        <div className="flex items-center flex-grow">
          {isEditing ? (
            <form>

              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-grow p-1 border-b border-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
                autoFocus
              />
              <CustomDatePicker selectedDate={editedDueDate as Date | null} onDateChange={setEditedDueDate} className="bottom" />

            </form>
          ) : (

            <>

              <Checkbox
                id={id}
                checked={isCompleted}
                onChange={handleTodoToggle}
                className="mr-3"
              />
              <span className={`ml-2 text-lg ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {title}
              </span>
            </>
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
            <DropdownButton onEdit={handleEdit} onDelete={handleDeleteModalOpen} />
          </>
        )}
      </li>

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} center>
        <h2>Delete Task?</h2>
        <p>Are you sure you want to delete this todo item?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 mr-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Todo;
