import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UsersPage } from "./pages/UsersPage";
import { SongsPage } from "./pages/SongsPage";
import { GenresPage } from "./pages/GenresPage";
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
      {/* Глобальний Toaster */}
      <Toaster position="top-right" />

      {/* Головне меню */}
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
          </Box>
        </Toolbar>
      </AppBar>

      {/* Контент */}
      <Box sx={{ padding: 3 }}>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/genres" element={<GenresPage />} />
        </Routes>
      </Box>
    </Router>
  );
}
