import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import MainPage from "./pages/Main";
import ArticlePage from "./pages/Article";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="" element={<MainPage />}></Route>
          <Route path="articles/:id" element={<ArticlePage />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
