import { useState } from "react";

import Button from "./components/ui/Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount((prev) => (prev > 0 ? prev - 1 : prev));
  const handleReset = () => setCount(0);

  return (
    <>
      <div className="card">
        <h1>Counter App</h1>
        <h2>
          count is <span data-testid="counter-value">{count}</span>
        </h2>
        <Button onClick={handleDecrease}>Decrease</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleIncrease}>Increase</Button>
      </div>
    </>
  );
}

export default App;
