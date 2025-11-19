import { useEffect, useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    window.api.onMultiplyResult((data) => {
      const { value, error } = data || {};
      if (value) {
        setResult(value)
      } else {
        console.log("Please send valid .")
      }
    });
  }, []);

  const handleClick = ()=>{
    window.api.sendNumber(number);
  }
  return (
    <div>
      <h1>IPC</h1>
      <label>
        Enter a number:
        <input id="num" type="number"  onChange={e => setNumber(e.target.value)} />
      </label>
      <button id="sendBtn" onClick={handleClick} >Send to  Main → Child</button>
      <h3>Multpliyed by 2 : {result}</h3> 
    </div>
  );
}

export default App;
