
export interface TodoPostCallType {
  title: string;
  completed: boolean;
  dueDate: string | null;
}

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string | null;
}
