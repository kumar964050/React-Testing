import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Button from "../../components/Button";

describe("Button Component", () => {
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

  it("applies custom className and style", () => {
    render(
      <Button className="custom-class" style={{ background: "red" }}>
        Styled
      </Button>
    );
    const btn = screen.getByRole("button", { name: /styled/i });
    expect(btn).toHaveClass("custom-class");
    expect(btn).toHaveStyle("background: red");
  });

  it("supports aria-label for accessibility", () => {
    render(<Button aria-label="custom-label" />);
    expect(screen.getByLabelText("custom-label")).toBeInTheDocument();
  });

  it("renders even with no children", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
