import "./App.css";
import { Route, Routes } from "react-router-dom";

import ErrorPage from "./Misc/errorPage";
import AdminLogin from "./Admin/pages/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
