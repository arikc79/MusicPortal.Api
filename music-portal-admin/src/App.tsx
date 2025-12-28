import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎵 Music Portal Admin
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
            <Button color="inherit" component={Link} to="/songs">
              Songs
            </Button>
            <Button color="inherit" component={Link} to="/genres">
              Genres
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Routes>
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
        </Routes>
      </Box>
    </Router>
  );
}
