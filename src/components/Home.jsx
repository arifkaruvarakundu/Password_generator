import React, { useState } from "react";
import "./Home.css";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Characters";

function Home() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  function generatePassword() {
    let characters = "";

    if (includeUpperCase) {
      characters += upperCaseLetters;
    }
    if (includeLowerCase) {
      characters += lowerCaseLetters;
    }
    if (includeNumbers) {
      characters += numbers;
    }
    if (includeSymbols) {
      characters += specialCharacters;
    }
    setPassword(createPassword(characters));
  }

  function createPassword(characters) {
    let password = "";
    const charactersLength = characters.length;
    for (let i = 0; i < passwordLength; i++) {
      let index = Math.round(Math.random() * charactersLength - 1);
      if (index < 0) {
        index = 0;
      }
      password += characters[index];
    }
    return password;
  }

  function handleCopyClick() {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Copied!", { autoClose: 2000 });
    } else {
      toast.error("No password generated", { autoClose: 2000 });
    }
  }

  return (
    <div className="wrapper">
      <h2>Password Generator</h2>
      <div className="output">
        <h3>{password}</h3>
        <button
          className="copyBtn"
          onClick={handleCopyClick}
        >
          Copy
        </button>
      </div>
      <div className="row">
        <p>Password Length</p>
        <input
          type="number"
          name="passLength"
          id="passLenInput"
          value={passwordLength}
          max={20}
          min={6}
          onInput={(e) => setPasswordLength(e.currentTarget.value.length)}
        />
      </div>
      <div className="row">
        <p>Add Uppercase Letters</p>
        <input
          type="checkbox"
          name="uppercase-letters"
          id="uppercase-lengths"
          checked={includeUpperCase}
          onChange={(e) =>
            includeLowerCase || includeNumbers || includeSymbols
              ? setIncludeUpperCase(e.currentTarget.checked)
              : null
          }
        />
      </div>
      <div className="row">
        <p>Add Lowercase Letters</p>
        <input
          type="checkbox"
          name="lowercase-letters"
          id="lowercase-letters"
          checked={includeLowerCase}
          onChange={(e) =>
            includeUpperCase || includeNumbers || includeSymbols
              ? setIncludeLowerCase(e.currentTarget.checked)
              : null
          }
        />
      </div>
      <div className="row">
        <p>Include Numbers</p>
        <input
          type="checkbox"
          name="include-numbers"
          id="include-numbers"
          checked={includeNumbers}
          onChange={(e) =>
            includeLowerCase || includeUpperCase || includeSymbols
              ? setIncludeNumbers(e.currentTarget.checked)
              : null
          }
        />
      </div>
      <div className="row">
        <p>Include Symbols</p>
        <input
          type="checkbox"
          name="include-symbols"
          id="include-symbols"
          checked={includeSymbols}
          onChange={(e) =>
            includeLowerCase || includeNumbers || includeUpperCase
              ? setIncludeSymbols(e.currentTarget.checked)
              : null
          }
        />
      </div>

      <div className="row">
        <button type="submit" id="generateBtn" onClick={generatePassword}>
          Generate Password
        </button>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
    </div>
  );
}

export default Home;

