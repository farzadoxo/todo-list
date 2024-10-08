import React, { useState } from 'react';
import { useTodosListState } from '../store';
import api from '../axios';

const NewTask: React.FC = () => {
  const [taskText, setTaskText] = useState('');
  const taskStore = useTodosListState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!taskText.trim()) {
      alert("Task cannot be empty");
      return;
    }

    const taskData = {
      title: taskText,
      completed: false,
      dueDate: null
    };

    try {
      const res = await api.post("/api/todos/", taskData);

      if (res.data) {
        taskStore.addTodo(res.data);
        console.log(res.data);
        setTaskText(''); // Clear input field after successful submission
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default NewTask;
