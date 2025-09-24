import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import type { Todo } from "./types";

import TodoItem from "./components/TodoItem";
import Button from "./components/Button";
import Input from "./components/Input";

const App = () => {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // add new item to the store
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // new todo
    const newTodo: Todo = {
      id: uuidV4(),
      text: text.trim(),
      isCompleted: false,
    };
    setTodos((prev: Todo[]) => [...prev, newTodo]);
    setText("");
  };
  const handleSave = () => {
    alert("save btn triggered");
  };
  const toggleTodoStatus = (id: string, value?: boolean): void => {
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => {
        if (todo.id === id)
          return { ...todo, isCompleted: value ?? !todo.isCompleted };
        return todo;
      })
    );
  };
  const handleDelete = (id: string): void => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
  };

  return (
    <div className="todos-bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="todos-heading">Todos </h1>
            <h1 className="create-task-heading create-task-heading-subpart">
              Create Task
            </h1>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                className="todo-user-input"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button>Add</Button>
            </form>
            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  handleDelete={handleDelete}
                  toggleTodoStatus={toggleTodoStatus}
                />
              ))}
            </ul>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
