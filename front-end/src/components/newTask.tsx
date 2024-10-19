import React, { useState, useRef, ChangeEvent } from 'react';
import { addDays, format } from 'date-fns';
import api from '../axios';
import { useTodosListState } from '../store';
import type { TodoPostCallType } from '../types';
import 'react-datepicker/dist/react-datepicker.css'; // Importing styles for DatePicker
import DatePicker from 'react-datepicker';
import PrioritySelect from './prioriyLevel';

const NewTask: React.FC = () => {
  const [taskData, setTaskData] = useState<TodoPostCallType>({
    title: '',
    completed: false,
    dueDate: null
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [priority, setPriority] = useState<string>("None"); // Default to "None"
  const taskStore = useTodosListState();
  const contentEditableRef = useRef<HTMLDivElement>(null);



  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value;
    let dueDate: string | null = null;
    let priority: string | null = null; // Initialize priority variable

    // Helper function to get the next occurrence of a day
    const getNextDayOfWeek = (day: string): Date | null => {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const today = new Date();
      const targetDay = days.indexOf(day);

      if (targetDay !== -1) {
        const daysUntilTarget = (targetDay + 7 - today.getDay()) % 7;
        return addDays(today, daysUntilTarget === 0 ? 7 : daysUntilTarget);
      }

      return null;
    };

    // Getting dueDate from the title
    const textArray = text.toLowerCase().split(" ");
    const today = new Date();

    // Check for due dates
    if (textArray.includes("today")) {
      dueDate = format(today, 'yyyy-MM-dd');
    } else if (textArray.includes("tomorrow")) {
      dueDate = format(addDays(today, 1), 'yyyy-MM-dd');
    } else if (textArray.includes("next")) {
      const dayIndex = textArray.indexOf("next") + 1;
      if (dayIndex < textArray.length) {
        const day = textArray[dayIndex];
        const nextDay = getNextDayOfWeek(day);
        if (nextDay) {
          dueDate = format(nextDay, 'yyyy-MM-dd');
        }
      }
    }

    // Check for priority level based on input text
    const priorityMatch = text.match(/~\s*(low|medium|high)/i);
    if (priorityMatch) {
      console.log("no heart")
      priority = priorityMatch[1].toLowerCase(); // Capture the matched priority level
      setPriority(priority)
    }

    // Update state with task data
    setSelectedDate(dueDate)
    setTaskData(prevState => ({
      ...prevState,
      title: text,
      dueDate: dueDate,
      priority: priority || null // Set priority or default to null
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!taskData.title.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const res = await api.post("/api/todos/", taskData);

      if (res.data) {
        taskStore.addTodo(res.data);
        console.log(res.data);
        setTaskData(prevState => ({
          ...prevState,
          title: "",
          dueDate: null // Resetting dueDate after submission
        }));
        setSelectedDate(null); // Resetting selected date after submission
        if (contentEditableRef.current) {
          contentEditableRef.current.innerHTML = '';
        }
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
          type='text'
          onChange={handleTextChange}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>

        <PrioritySelect
          selected={priority}
          onChange={(e) => setPriority(e.target.value)}
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(format(date, "yyyy-MM-dd"))} // Update state with selected date
          className="ml-2 border border-gray-300 rounded-md p-2"
          placeholderText="Select Due Date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </form >
  );
};

export default NewTask;
