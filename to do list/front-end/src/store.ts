import { create } from "zustand";
import { TodoType } from "./types";

interface TodosListState {
  todosList: TodoType[];
  addTodo: (task: TodoType) => void;
  setTodo: (tasks: TodoType[]) => void;
  clearTodosList: () => void;
  modifyTodo: (id: number, newTodo: TodoType) => void;
}


const useTodosListState = create<TodosListState>((set) => ({
  todosList: [],

  addTodo: (task) => set((state) => ({
    todosList: [...state.todosList, task],
  })),

  setTodo: (tasks) => set(() => ({ todosList: tasks })),

  clearTodosList: () => set({ todosList: [] }),

  deleteTodo: (id: number) => set((state) => ({
    todosList: state.todosList.filter(todo => todo.id !== id), // Filter out the todo with the given id
  })),

  modifyTodo: (id: number, newTodo: TodoType) => set((state) => {
    console.log("Before update:", state.todosList);
    const updatedTodosList = state.todosList.map(todo =>
      todo.id === id ? newTodo : todo
    );
    console.log("After update:", updatedTodosList);
    return { todosList: updatedTodosList }; // Return updated state
  }),
}));


export { useTodosListState }
