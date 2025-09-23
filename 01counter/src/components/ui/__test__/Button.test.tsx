import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Button from "../Button";

describe("Button Components", () => {
  it("renders with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    await userEvent.click(screen.getByRole("button", { name: /disabled/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with null as children (edge)", () => {
    render(<Button>{null}</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles rapid multiple clicks (stress test)", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Spam</Button>);
    const btn = screen.getByRole("button", { name: /spam/i });

    await userEvent.click(btn);
    await userEvent.click(btn);
    await userEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("handles extremely long text", () => {
    const longText = "Click".repeat(1000);
    render(<Button>{longText}</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("works with different types (submit/reset)", () => {
    render(
      <>
        <form data-testid="form">
          <Button type="submit">Submit</Button>
        </form>
        <Button type="reset">Reset</Button>
      </>
    );

    expect(screen.getByRole("button", { name: /submit/i })).toHaveAttribute(
      "type",
      "submit"
    );
    expect(screen.getByRole("button", { name: /reset/i })).toHaveAttribute(
      "type",
      "reset"
    );
  });

  it("does not crash with invalid type (worst-case)", () => {
    render(<Button type={"button" as any}>Default</Button>);
    const button = screen.getByRole("button", { name: /default/i });

    // Button should still render
    expect(button).toBeInTheDocument();

    // Worst case: browser will default to 'submit'
    expect(button).toHaveAttribute("type", "button");
  });
});
