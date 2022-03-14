// Component(s)
import { useState, useRef, useEffect } from "react";
import { CodeSandbox } from "./CodeSandbox/CodeSandbox";
import { Provider } from "react-redux";
// Redux Store
import { store } from "../state/state";

import { Cache } from "../utils/classes/Cache";
import { Cell } from "../state/cell";

export const App: React.FC = () => {
  const [input, setInput] = useState("")
  const [count, setCount] = useState(1);
  const [cache, setCache] = useState(new Cache());
  const cacheRef = useRef(cache);
  // const setCache = (data: any)  => {
  //   cacheRef.current = data;
  //   _setCache(data);
  // }

  useEffect(() => {
    console.log("cells: ", cacheRef.current.cells)
    console.log("list: ", cacheRef.current.list)
  }, [count]);

  function handleClick(e: any) {
    const cellValue = { id: `${count}`, type: "code", content: input } as Cell
    if (count === 1) cacheRef.current.set(cellValue);
    else {
      cacheRef.current.delete("d575051c-9c55-4572-a00c-ab41d8a01ff6")

      /* cacheRef.current.set(cellValue, undefined, cacheRef.current.cells[count - 1]) */

    }
    setCount(prevCount => prevCount + 1);
    setCache(cacheRef.current);
    setInput("");
  }

  function handleChange(currInput: string) {
    setInput(currInput);
  }

  return (
    <Provider store={store}>
      <input placeholder={"content"} value={input} onChange={e => handleChange(e.target.value)} />
      <button onClick={e => handleClick(e)}>Go!</button>
      <CodeSandbox />;
    </Provider>
  );
};
