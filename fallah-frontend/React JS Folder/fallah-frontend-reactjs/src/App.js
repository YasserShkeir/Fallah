import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ErrorPage from "./Misc/errorPage";
import AdminLogin from "./Admin/pages/login";
import AdminLandingPage from "./Admin/pages/landingPage";

const theme = createTheme({
  palette: {
    lightGreen: {
      main: "#23ce6b",
    },
    creamWhite: {
      main: "#f6f8ff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminLandingPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
