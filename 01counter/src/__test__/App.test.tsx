import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App Component", () => {
  it("renders heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /counter app/i })
    ).toBeInTheDocument();
  });

  it("should start with counter value 0", () => {
    render(<App />);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("0");
  });

  it("increments counter on + button click", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /increase/i });
    const value = screen.getByTestId("counter-value");

    await userEvent.click(button);
    expect(value).toHaveTextContent("1");
  });

  it("decrements counter on - button click", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /decrease/i });
    const value = screen.getByTestId("counter-value");

    await userEvent.click(button);
    // assumes restriction at 0
    expect(value).toHaveTextContent("0");
  });

  it("resets counter to 0", async () => {
    render(<App />);
    const incBtn = screen.getByRole("button", { name: /increase/i });
    const resetBtn = screen.getByRole("button", { name: /reset/i });
    const value = screen.getByTestId("counter-value");

    await userEvent.click(incBtn);
    await userEvent.click(incBtn);
    expect(value).toHaveTextContent("2");

    await userEvent.click(resetBtn);
    expect(value).toHaveTextContent("0");
  });

  it("handles rapid clicks correctly", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /increase/i });
    const value = screen.getByTestId("counter-value");

    await userEvent.dblClick(button); // double click
    expect(value).toHaveTextContent("2");

    await userEvent.click(button);
    expect(value).toHaveTextContent("3");
  });

  it("should not go below 0 if restricted", async () => {
    render(<App />);
    const decButton = screen.getByRole("button", { name: /decrease/i });
    const value = screen.getByTestId("counter-value");

    await userEvent.click(decButton);
    expect(Number(value.textContent)).toBeGreaterThanOrEqual(0);
  });

  it("allows keyboard interaction", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /increase/i });
    const value = screen.getByTestId("counter-value");

    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(value).toHaveTextContent("1");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
