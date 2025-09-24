import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("App Component", () => {
  it("renders heading 'Todos'", () => {
    render(<App />);
    expect(screen.getByText(/Todos/i)).toBeInTheDocument();
  });

  it("renders heading 'Create Task'", () => {
    render(<App />);
    expect(screen.getByText(/Create Task/i)).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(<App />);
    expect(
      screen.getByPlaceholderText(/What needs to be done?/i)
    ).toBeInTheDocument();
  });

  it("renders Add and Save buttons", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  // CRUD

  // Create
  it("can add a new todo", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    const addBtn = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "New Task");
    await userEvent.click(addBtn);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("does not add empty todo (edge case)", async () => {
    render(<App />);
    const addBtn = screen.getByRole("button", { name: /add/i });

    await userEvent.click(addBtn);

    // no todo item should appear
    expect(screen.queryByRole("li")).not.toBeInTheDocument();
  });

  // UPDATE
  it("can toggle todo completion via checkbox", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    const addBtn = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Toggle Task");
    await userEvent.click(addBtn);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  // DELETE
  it("can delete a todo", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    const addBtn = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Delete Me");
    await userEvent.click(addBtn);

    const deleteBtn = screen.getByTestId("delete-todo");
    await userEvent.click(deleteBtn);

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });

  it("handles multiple todos correctly", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    const addBtn = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Task 1");
    await userEvent.click(addBtn);

    await userEvent.type(input, "Task 2");
    await userEvent.click(addBtn);

    await userEvent.type(input, "Task 3");
    await userEvent.click(addBtn);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });
});
