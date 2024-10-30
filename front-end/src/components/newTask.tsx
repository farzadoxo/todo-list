import React, { useState, useRef, ChangeEvent } from 'react';
import { addDays, format } from 'date-fns';
import api from '../axios';
import { useTodosListState } from '../store';
import type { TodoPostCallType } from '../types';
import PrioritySelect from './priorityLevel';
import CustomDatePicker from './customDatePicker';

const NewTask: React.FC = () => {
  const [taskData, setTaskData] = useState<TodoPostCallType>({
    title: '',
    completed: false,
    dueDate: null,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<string>("none");
  const taskStore = useTodosListState();
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value;
    let dueDate: Date | null = null;
    let priority: string | null = null;

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

    if (textArray.includes("today")) {
      dueDate = today
    } else if (textArray.includes("tomorrow")) {
      dueDate = addDays(today, 1)
    } else if (textArray.includes("next")) {
      const dayIndex = textArray.indexOf("next") + 1;
      if (dayIndex < textArray.length) {
        const day = textArray[dayIndex];
        const nextDay = getNextDayOfWeek(day);
        if (nextDay) {
          dueDate = new Date(nextDay)
        }
      }
    }

    const priorityMatch = text.match(/~\s*(low|medium|high)/i);
    if (priorityMatch) {
      priority = priorityMatch[1].toLowerCase();
      setPriority(priority);
    }
    let formattedDueDate: string;
    if (dueDate) {

      formattedDueDate = format(dueDate, "yyyy-MM-dd")
    }

    setSelectedDate(dueDate);

    setTaskData(prevState => ({
      ...prevState,
      title: text,
      dueDate: formattedDueDate,
      priority: priority || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskData.title.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const res = await api.post("/api/todos/", taskData);

      if (res.data) {
        taskStore.addTodo(res.data);
        console.log(res.data);

        // Resetting task data
        setTaskData({
          title: "",
          completed: false,
          dueDate: null,
        });
        setSelectedDate(null);

        // Clear contentEditableRef if needed
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row my-3 mx-1 max-w-md w-full">
      <div className="flex items-center border border-gray-300 rounded-md w-full">
        <button type="submit" className="mr-2">
          <img src="/add-circle-svgrepo-com.svg" width={"30px"} height={"30px"} className='w-6 h-6' alt='add task' />
        </button>

        <input
          type='text'
          value={taskData.title} // Set value here
          onChange={handleTextChange}
          className="h-8 p-2 border-none bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 flex-grow"
          placeholder="Add a new task..."
        />

        {/* Uncomment and implement these components as needed */}
        <PrioritySelect selected={priority} onValueChangeSetter={setPriority} />
        <CustomDatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      </div>
    </form>
  );
};

export default NewTask;
