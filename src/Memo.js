import { useMemo, useState } from "react";

const fibonacci = (n) => {
  if (n <= 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const MemoComponent = () => {
  const [num, setNum] = useState(3);
  const [isGreen, setIsGreen] = useState(true);
  let fib = useMemo(() => fibonacci(num), [num]);
  return (
    <div>
      {/* eslint-disable-next-line */}
      <h2
        style={{ color: isGreen ? "green" : "red" }}
        onClick={() => setIsGreen(!isGreen)}
      >
        useMemo Example
      </h2>
      <h3>
        Fibonacci of {num} is {fib}
      </h3>
      <button onClick={() => setNum(num + 1)}>Increment</button>
    </div>
  );
};

export default MemoComponent;
