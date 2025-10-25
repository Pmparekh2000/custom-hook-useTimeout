import "./App.css";
import { useTimeout } from "./hooks/useTimeout";
import { useState } from "react";
import useThrottle from "./hooks/useThrottle";
import useDebounce from "./hooks/useDebounce";

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
  const [search, setSearch] = useState("");
  const [cb, setCb] = useState(() => getCallback());
  const [delay, setDelay] = useState(2000);
  const makeApiCall = useThrottle(cb, delay, true);
  const debouncedValue = useDebounce(search, 2000);
  // useTimeout(cb, delay);
  return (
    <div className="App">
      {/* <button onClick={() => setCb(anotherCallback)}>Change callback</button>
      <button onClick={() => setDelay(5000)}>Change Delay</button>
      <button onClick={() => makeApiCall()}>Make API Call</button> */}
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <hr />
      <h2>Normal: {search}</h2>
      <h2>useDebounce: {debouncedValue}</h2>
    </div>
  );
}

export default App;
