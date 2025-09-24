import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Input from "../../components/Input";

describe("Input Component", () => {
  it("renders with basic props", () => {
    const handleChange = vi.fn();
    render(
      <Input
        type="text"
        className="demo-class"
        placeholder="What needs to be done?"
        value="demo"
        onChange={handleChange}
      />
    );

    const inputEl = screen.getByPlaceholderText(/What needs to be done?/i);
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveClass("demo-class");
    expect(inputEl).toHaveAttribute("type", "text");
    expect(inputEl).toHaveAttribute("placeholder", "What needs to be done?");
    expect(inputEl).toHaveValue("demo");
  });

  it("calls onChange when typing", async () => {
    const handleChange = vi.fn();
    render(
      <Input
        data-testid="input-value"
        type="text"
        value=""
        onChange={handleChange}
      />
    );
    const inputEl = screen.getByTestId("input-value");

    await userEvent.type(inputEl, "hello");
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(5); // "hello" has 5 chars
  });

  it("respects disabled prop", async () => {
    const handleChange = vi.fn();
    render(<Input type="text" disabled onChange={handleChange} />);
    const inputEl = screen.getByRole("textbox");

    expect(inputEl).toBeDisabled();
    await userEvent.type(inputEl, "can't type");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders with different input types", () => {
    render(
      <>
        <Input type="password" placeholder="Enter password" />
        <Input type="email" placeholder="Enter email" />
        <Input type="number" placeholder="Enter number" />
      </>
    );

    expect(screen.getByPlaceholderText(/Enter password/i)).toHaveAttribute(
      "type",
      "password"
    );
    expect(screen.getByPlaceholderText(/Enter email/i)).toHaveAttribute(
      "type",
      "email"
    );
    expect(screen.getByPlaceholderText(/Enter number/i)).toHaveAttribute(
      "type",
      "number"
    );
  });

  it("renders with null/empty value (edge case)", () => {
    render(<Input type="text" value={""} />);
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveValue("");
  });

  it("handles extremely long input values (stress test)", () => {
    const longValue = "a".repeat(10000);
    render(<Input type="text" value={longValue} readOnly />);
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveValue(longValue);
  });

  it("supports aria-label for accessibility", () => {
    render(<Input type="text" aria-label="custom-input" />);
    expect(screen.getByLabelText("custom-input")).toBeInTheDocument();
  });

  it("can be readOnly", async () => {
    const handleChange = vi.fn();
    render(
      <Input type="text" readOnly onChange={handleChange} value="locked" />
    );
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveAttribute("readonly");
    await userEvent.type(inputEl, "change?");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("triggers onChange when cleared with Backspace", async () => {
    const handleChange = vi.fn();
    render(<Input type="text" defaultValue="abc" onChange={handleChange} />);
    const inputEl = screen.getByRole("textbox");

    await userEvent.type(inputEl, "{backspace}{backspace}{backspace}");
    expect(handleChange).toHaveBeenCalled();
  });
});
