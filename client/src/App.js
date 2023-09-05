import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/HomePage";
import LoginPage from "scenes/LoginPage";
import ProfilePage from "scenes/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate replace to="/login" />}
              // element={<HomePage />}
            />
            <Route
              path="/login"
              element={
                !isAuth ? <LoginPage /> : <Navigate replace to="/home" />
              }
              // element={<LoginPage />}
            />
            <Route
              path="/profile/:userId"
              element={
                isAuth ? <ProfilePage /> : <Navigate replace to="/login" />
              }
              // element={<ProfilePage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
