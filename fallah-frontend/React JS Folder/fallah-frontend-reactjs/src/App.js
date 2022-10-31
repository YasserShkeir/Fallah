import "./App.css";
import { Route, Routes } from "react-router-dom";

import ErrorPage from "./Misc/errorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
