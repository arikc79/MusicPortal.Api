import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { UsersPage } from "./pages/UsersPage";
import { SongsPage } from "./pages/SongsPage";
import { GenresPage } from "./pages/GenresPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

/* ===== APP LAYOUT ===== */
function AppLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [hasToken, setHasToken] = useState<boolean>(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    setHasToken(Boolean(localStorage.getItem("token")));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* ===== TOP BAR ===== */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("appTitle")}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {/* PROTECTED MENU */}
            {hasToken && (
              <>
                <Button color="inherit" component={Link} to="/users">
                  {t("users")}
                </Button>
                <Button color="inherit" component={Link} to="/songs">
                  {t("songs")}
                </Button>
                <Button color="inherit" component={Link} to="/genres">
                  {t("genres")}
                </Button>
              </>
            )}

            {/* LANGUAGE */}
            <Button color="inherit" onClick={() => i18n.changeLanguage("uk")}>
              UA
            </Button>
            <Button color="inherit" onClick={() => i18n.changeLanguage("en")}>
              EN
            </Button>

            {/* AUTH */}
            {!hasToken && location.pathname !== "/login" && (
              <Button color="inherit" component={Link} to="/login">
                {t("login")}
              </Button>
            )}

            {hasToken && (
              <Button color="inherit" onClick={handleLogout}>
                {t("logout")}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ===== ROUTES ===== */}
      <Box sx={{ padding: 3 }}>
        <Routes>
          {/* ROOT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* PUBLIC */}
          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/songs"
            element={
              <ProtectedRoute>
                <SongsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/genres"
            element={
              <ProtectedRoute>
                <GenresPage />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Box>
    </>
  );
}

/* ===== ROOT APP ===== */
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
