import "./App.css";
import { Route, Routes } from "react-router-dom";

import ErrorPage from "./Misc/errorPage";
import AdminLogin from "./Admin/pages/login";
import AdminLandingPage from "./Admin/pages/landingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
