import { memo, useCallback, useEffect, useState } from "react";

const ExpensiveComputation = memo(({ computed, count }) => {
  return (
    <div>
      <h2>computed: {computed(count)}</h2>
      <p>last re-render : {new Date().toLocaleString()}</p>
    </div>
  );
});

const CallbackComponent = () => {
  const [num, setNum] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  });

  const fibonacci = (n) => {
    if (n <= 1) {
      return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  return (
    <div>
      <h2>useCallback example</h2>
      <p>the time is: {time.toLocaleTimeString()}</p>
      <ExpensiveComputation computed={useCallback(fibonacci, [])} count={num} />
      <button onClick={() => setNum(num + 1)}>+</button>
    </div>
  );
};

export default CallbackComponent;
