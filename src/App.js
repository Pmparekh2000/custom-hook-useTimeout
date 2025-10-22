import "./App.css";
import { useTimeout } from "./hooks/useTimeout";
import { useState } from "react";
import useThrottle from "./hooks/useThrottle";

const getCallback = () => {
  return () => {
    console.log("Hello");
  };
};

const anotherCallback = () => {
  return () => {
    console.log("Hi");
  };
};

function App() {
  const [cb, setCb] = useState(() => getCallback());
  const [delay, setDelay] = useState(2000);
  const makeApiCall = useThrottle(cb, delay, true);
  // useTimeout(cb, delay);
  return (
    <div className="App">
      <button onClick={() => setCb(anotherCallback)}>Change callback</button>
      <button onClick={() => setDelay(5000)}>Change Delay</button>
      <button onClick={() => makeApiCall()}>Make API Call</button>
    </div>
  );
}

export default App;
