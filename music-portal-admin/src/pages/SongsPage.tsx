import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { Button, CircularProgress, Paper } from "@mui/material";
import { useState } from "react";
import { SongDialog, SongForm } from "../components/songs/SongDialog";
import { SongsTable } from "../components/songs/SongsTable";

type Genre = { id: number; name: string };

export function SongsPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SongForm | null>(null);

  const { data: genres = [] } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: async () => (await api.get("/Genres")).data
  });

  const { data: songs = [], isLoading } = useQuery<any[]>({
    queryKey: ["songs"],
    queryFn: async () => (await api.get("/Songs")).data
  });

  const save = useMutation({
    mutationFn: (data: SongForm) =>
      data.id
        ? api.put(`/Songs/${data.id}`, data)
        : api.post("/Songs", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["songs"] });
      setOpen(false);
      setEditing(null);
    }
  });

  const del = useMutation({
    mutationFn: (id: number) => api.delete(`/Songs/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["songs"] })
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
        disabled={!genres.length}
      >
        Create song
      </Button>

      <SongsTable
        songs={songs.map((s) => ({
          ...s,
          genreName: genres.find((g) => g.id === s.genreId)?.name
        }))}
        onEdit={(s) => {
          setEditing(s);
          setOpen(true);
        }}
        onDelete={(id) => del.mutate(id)}
      />

      <SongDialog
        open={open}
        initial={editing}
        genres={genres}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={(data) => save.mutate(data)}
      />
    </Paper>
  );
}
