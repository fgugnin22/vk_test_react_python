import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import { store } from "./store";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes></Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
