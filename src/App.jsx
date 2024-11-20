import { useCallback, useState, useEffect, useRef } from "react";

/**
 * A functional component that generates a random password of a given length
 * and optionally includes numbers and special characters in the password.
 *
 * The component also includes the ability to copy the generated password to
 * the clipboard.
 *
 * Props:
 * None
 *
 * State:
 * length: The length of the password, defaults to 8
 * numbersallowed: Whether to include numbers in the password, defaults to false
 * charallowed: Whether to include special characters in the password, defaults to false
 * password: The generated password, defaults to an empty string
 *
 * Hooks:
 * useRef: Used to create a reference to the password input element
 * useCallback: Used to memoize the password generator and clipboard copier functions
 * useEffect: Used to generate the password when the component mounts or when the length, numbersallowed, or charallowed state changes
 *
 * Returns:
 * A JSX element containing the password generator UI
 */
function App() {
  const [length, setLength] = useState(8);
  const [numbersallowed, setNumbersallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  const passwordref = useRef(null);
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersallowed) {
      str = str + "0123456789";
    }
    if (charallowed) {
      str = str + "!@#$%^&*+-*?";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersallowed, charallowed, setPassword]);
  const copytoclipboard = useCallback(() => {
    passwordref.current.select();
    passwordref.current.setSelectionRange(0, 101); //selection range from 0 to 101
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordgenerator();
  }, [length, numbersallowed, charallowed, setPassword, passwordgenerator]);

  return (
    <>
      <div className="w-full max-w-md  mx-auto py-4 shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-3xl text-center my-3">Password Generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copytoclipboard}
            className="bg-orange-500 text-white px-3 focus: shadow-lg transform active:scale-y-75 transition-transform"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>lenght:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbersallowed}
              id="numberInput"
              onChange={() => {
                setNumbersallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charInput"
              onChange={() => {
                setCharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
