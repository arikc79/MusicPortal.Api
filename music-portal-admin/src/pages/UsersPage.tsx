import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from "@mui/material";

/** DTO користувача (відповідає backend) */
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function UsersPage() {
  const {
    data: users = [], // 🔑 ГАРАНТУЄМО МАСИВ
    isLoading,
    isError,
    error
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/Users");
      return res.data;
    }
  });

  // ⏳ Завантаження
  if (isLoading) {
    return <CircularProgress />;
  }

  // ❌ Помилка запиту
  if (isError) {
    return (
      <Typography color="error">
        Помилка завантаження користувачів
        {error instanceof Error ? `: ${error.message}` : ""}
      </Typography>
    );
  }

  // 📭 Порожній список
  if (users.length === 0) {
    return <Typography>Користувачів поки немає</Typography>;
  }

  // ✅ Нормальний рендер
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      <List>
        {users.map((u) => (
          <ListItem key={u.id} divider>
            <ListItemText
              primary={u.name}
              secondary={`${u.email} — ${u.role}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
