import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberall, setnumberall] = useState(false);
  const [charall, setcharall] = useState(false);
  const [pasword, setpasword] = useState();
  const genpass = useRef(null);
  const spass = useCallback(() => {
    var pass = "";
    var s = "ABCDEFGHIKJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberall) {
      s += "0123456789";
    }
    if (charall) {
      s += "!@#$%^&*(){}";
    }
    for (let i = 0; i < length; i++) {
      pass += s[Math.floor(Math.random() * s.length)];
    }
    setpasword(pass);
  }, [length, numberall, charall]);
  useEffect(() => {
    spass();
  }, [length, numberall, charall]);
  const cpymaal = useCallback(() => {
    genpass.current?.select();
    window.navigator.clipboard.write(pasword);
  }, [pasword]);

  return (
    <>
      <h1>Password Generator</h1>
      <div className="outer">
        <div>
          <input type="text" value={pasword} ref={genpass} />
          <button onClick={cpymaal}>copy</button>
          <input
            type="range"
            name="length"
            min="8"
            max="50"
            onChange={(e) => {
              setlength(e.target.value);
            }}
            value={length}
          />
          <label htmlFor="length">length:{length}</label>
         <div className="checkbox-row">
  <input
    type="checkbox"
    id="numbers"
    onChange={() => {
      setnumberall((prev) => !prev);
    }}
  />
  <label htmlFor="numbers">Numbers</label>
</div>

<div className="checkbox-row">
  <input
    type="checkbox"
    id="characters"
    onChange={() => {
      setcharall((prev) => !prev);
    }}
  />
  <label htmlFor="characters">Characters</label>
</div>

        </div>
      </div>
    </>
  );
}

export default App;
