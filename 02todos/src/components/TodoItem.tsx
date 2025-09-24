import React from "react";
import type { TodoItemProps } from "../types";
import Input from "./Input";
import Button from "./Button";

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  isCompleted,
  text,
  toggleTodoStatus,
  handleDelete,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleTodoStatus(id, e.target.checked);
  };

  return (
    <li className="todo-item-container d-flex flex-row">
      <Input
        checked={isCompleted}
        onChange={handleCheckboxChange}
        type="checkbox"
        className="checkbox-input"
      />
      <div className="label-container d-flex flex-row">
        <label
          onClick={() => toggleTodoStatus(id)}
          className={`checkbox-label ${isCompleted && "checked"}`}
        >
          {text}
        </label>
        <button
          className="delete-icon-container"
          onClick={() => handleDelete(id)}
          data-testid="delete-todo"
        >
          <i className="far fa-trash-alt delete-icon"></i>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
