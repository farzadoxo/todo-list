type priority = 'low' | 'medium' | 'high';

export interface TodoPostCallType {
  title: string;
  completed: boolean;
  dueDate: string | null;
  priority?: priority;
}

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string | null;
  priority?: priority;
}
