import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ErrorPage from "./Misc/errorPage";
import Visitor from "./Visitor/pages/landingPage";
import AdminLogin from "./Admin/pages/login";
import AdminLandingPage from "./Admin/pages/landingPage";
import AdminOrdersPage from "./Admin/pages/ordersList";
import AdminUsersPage from "./Admin/pages/usersList";

const theme = createTheme({
  palette: {
    lightGreen: {
      main: "#23ce6b",
    },
    darkGreen: {
      main: "#1e6048",
    },
    creamWhite: {
      main: "#f6f8ff",
    },
    adminWhite: {
      main: "#f1f5f4",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
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
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Visitor />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminLandingPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
