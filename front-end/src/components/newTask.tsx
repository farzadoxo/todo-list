// TaskModal.tsx
import React, { useState, useRef, ChangeEvent } from 'react';
import { addDays, format } from 'date-fns';
import api from '../axios';
import { useTodosListState } from '../store';
import { TodoPostCallType, Priority, isPriority } from '../types';
import PrioritySelect from './priorityLevel';
import CustomDatePicker from './customDatePicker';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const [taskData, setTaskData] = useState<TodoPostCallType>({
    title: '',
    completed: false,
    dueDate: null,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<Priority>("none");
  const taskStore = useTodosListState();
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value;
    let dueDate: Date | null = null;

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
      dueDate = today;
    } else if (textArray.includes("tomorrow")) {
      dueDate = addDays(today, 1);
    } else if (textArray.includes("next")) {
      const dayIndex = textArray.indexOf("next") + 1;
      if (dayIndex < textArray.length) {
        const day = textArray[dayIndex];
        const nextDay = getNextDayOfWeek(day);
        if (nextDay) {
          dueDate = new Date(nextDay);
        }
      }
    }

    const priorityMatch = text.match(/~\s*(low|medium|high|none)/i);
    if (priorityMatch) {
      const matchedPriority = priorityMatch[1].toLowerCase();
      setPriority(isPriority(matchedPriority) ? matchedPriority : "none");
    }

    let formattedDueDate: string;
    if (dueDate) {
      formattedDueDate = format(dueDate, "yyyy-MM-dd");
      setSelectedDate(dueDate);
      setTaskData(prevState => ({
        ...prevState,
        dueDate: formattedDueDate,
      }));
    }

    setTaskData(prevState => ({
      ...prevState,
      title: text,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskData.title.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      console.log(taskData)
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

        // Close modal after submission
        onClose();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  if (!isOpen) return null; // Don't render anything if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add New Task</h2>

        <div className="flex items-center border border-gray-300 rounded-md w-full bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition duration-200">
          <button type="submit" className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 transition duration-200">
            <img src="/add-circle-svgrepo-com.svg" width={"30px"} height={"30px"} alt='add task' />
          </button>

          <input
            type='text'
            value={taskData.title}
            onChange={handleTextChange}
            className="h-6 p-2 border-none bg-transparent focus:outline-none flex-grow placeholder-gray-400"
            placeholder="Add a new task..."
            aria-label="New task input"
          />

          <PrioritySelect selected={priority} onValueChangeSetter={setPriority} />
          <CustomDatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>

        <button type="button" onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
      </form>
    </div>
  );
};

export default TaskModal;
