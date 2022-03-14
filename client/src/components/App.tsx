// import { useRef } from "react";
import { Provider } from "react-redux";
// Component(s)
import { CodeSandbox } from "./CodeSandbox/CodeSandbox";
// State Management 
import { store } from "../state/state";
import { Cache } from "../utils/classes/Cache";

export const App: React.FC = () => {
  // const cacheRef = useRef(new Cache());
  // const setCache = (data: any)  => {
  //   cacheRef.current = data;
  //   _setCache(data);
  // }
  
  return (
    <Provider store={store}>
      <CodeSandbox />
    </Provider>
  );
};
