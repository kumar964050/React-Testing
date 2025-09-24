import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import TodoItem from "../../components/TodoItem";

describe("TodoItem Component", () => {
  const defaultProps = {
    id: "1",
    isCompleted: false,
    text: "Test Todo",
    toggleTodoStatus: vi.fn(),
    handleDelete: vi.fn(),
  };

  it("renders todo item text", () => {
    render(<TodoItem {...defaultProps} />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("renders checkbox with correct state", () => {
    render(<TodoItem {...defaultProps} />);
    const checkbox = screen.getByRole("checkbox");
    // by default its not checked
    expect(checkbox).not.toBeChecked();
  });

  it("renders completed todo with 'checked' class", () => {
    render(<TodoItem {...defaultProps} isCompleted />);
    const label = screen.getByText("Test Todo");
    expect(label).toHaveClass("checked");
  });

  it("calls toggleTodoStatus when checkbox clicked", async () => {
    const toggleTodoStatus = vi.fn();
    render(<TodoItem {...defaultProps} toggleTodoStatus={toggleTodoStatus} />);
    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);
    expect(toggleTodoStatus).toHaveBeenCalledWith("1", true);
  });

  it("calls toggleTodoStatus when label clicked", async () => {
    const toggleTodoStatus = vi.fn();
    render(<TodoItem {...defaultProps} toggleTodoStatus={toggleTodoStatus} />);
    const label = screen.getByText("Test Todo");

    await userEvent.click(label);
    expect(toggleTodoStatus).toHaveBeenCalledWith("1");
  });

  it("calls handleDelete when delete icon clicked", async () => {
    const handleDelete = vi.fn();
    render(<TodoItem {...defaultProps} handleDelete={handleDelete} />);
    const deleteIcon = screen.getByRole("button", { hidden: true });

    await userEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledWith("1");
  });

  it("works with empty text (edge case)", () => {
    render(<TodoItem {...defaultProps} text="" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
});
