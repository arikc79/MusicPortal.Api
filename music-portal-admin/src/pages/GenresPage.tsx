import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { Button, CircularProgress, Paper } from "@mui/material";
import { useState } from "react";
import { GenreDialog, GenreForm } from "../components/genres/GenreDialog";
import { GenresTable } from "../components/genres/GenresTable";

export function GenresPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GenreForm | null>(null);

  const { data: genres = [], isLoading } = useQuery<GenreForm[]>({
    queryKey: ["genres"],
    queryFn: async () => (await api.get("/Genres")).data
  });

  const save = useMutation({
    mutationFn: (data: GenreForm) =>
      data.id
        ? api.put(`/Genres/${data.id}`, data)
        : api.post("/Genres", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["genres"] });
      setOpen(false);
      setEditing(null);
    }
  });

  const del = useMutation({
    mutationFn: (id: number) => api.delete(`/Genres/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["genres"] })
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Create genre
      </Button>

      <GenresTable
        genres={genres}
        onEdit={(g) => {
          setEditing(g);
          setOpen(true);
        }}
        onDelete={(id) => del.mutate(id)}
      />

      <GenreDialog
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
