export type Priority = 'low' | 'medium' | 'high' | "none";

export function isPriority(value: string): value is Priority {
  return value === 'low' || value === 'medium' || value === 'high' || value === 'none';
}

export interface Icon {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export interface TodoPostCallType {
  title: string;
  completed: boolean;
  dueDate: string | null;
  owner: string;
  priority?: Priority;
}

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string | null;
  owner: string;
  priority?: Priority;
}
