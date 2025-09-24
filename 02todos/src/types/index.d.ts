export interface TodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
  toggleTodoStatus: (id: string, value?: boolean) => void;
  handleDelete: (id: string) => void;
}
export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}
