import "./App.css";
import React, { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+~`|}{[]:;";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const passwordRef = useRef(null);

  const handleCopyClick = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(passwordRef.current.value);
    }
  };

  return (
    <>
      <h2>Password Generator <p>by / Muhammad Sumair Ali</p> </h2>
      <div>
        <input
          type="text"
          value={password}
          readOnly
          placeholder="password"
          ref={passwordRef}
        />
        <button onClick={handleCopyClick}>Copy</button>
      </div>

      <div>
        <input
          type="range"
          min="6"
          max="20"
          onChange={(e) => setLength(e.target.value)}
        />
        <label>Length: {length}</label>
        <br />

        <input
          type="checkbox"
          id="check1"
          onChange={(e) => setNumberAllowed(e.target.checked)}
        />
        <label for="check1">Number</label>

        <input
          id="check2"
          type="checkbox"
          onChange={(e) => setCharacterAllowed(e.target.checked)}
        />
        <label for="check2">Character</label>
      </div>
    </>
  );
}
