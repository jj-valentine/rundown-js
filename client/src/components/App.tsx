// Component(s)
import { CodeSandbox } from "./CodeSandbox/CodeSandbox";
import { Provider } from "react-redux";
// Redux Store
import { store } from "../state/state";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CodeSandbox />;
    </Provider>
  );
};
