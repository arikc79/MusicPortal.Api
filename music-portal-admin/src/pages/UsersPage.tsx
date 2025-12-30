import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { Button, CircularProgress, Paper } from "@mui/material";
import { useState } from "react";
import { UserDialog, UserForm } from "../components/users/UserDialog";
import { UsersTable } from "../components/users/UsersTable";

export function UsersPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<UserForm | null>(null);

  const { data: users = [], isLoading } = useQuery<UserForm[]>({
    queryKey: ["users"],
    queryFn: async () => (await api.get("/Users")).data
  });

  const save = useMutation({
    mutationFn: (data: UserForm) =>
      data.id
        ? api.put(`/Users/${data.id}`, data)
        : api.post("/Users", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      setEditing(null);
    }
  });

  const del = useMutation({
    mutationFn: (id: number) => api.delete(`/Users/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] })
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Create user
      </Button>

      <UsersTable
        users={users}
        onEdit={(u) => {
          setEditing(u);
          setOpen(true);
        }}
        onDelete={(id) => del.mutate(id)}
      />

      <UserDialog
        open={open}
        initial={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={(data) => save.mutate(data)}
      />
    </Paper>
  );
}
