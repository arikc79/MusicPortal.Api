import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";

export type SongForm = {
  id?: number;
  title: string;
  artist: string;
  genreId: number;
};

type Genre = {
  id: number;
  name: string;
};

type Props = {
  open: boolean;
  initial?: SongForm | null;
  genres: Genre[];
  onClose: () => void;
  onSave: (data: SongForm) => void;
};

export function SongDialog({
  open,
  initial,
  genres,
  onClose,
  onSave
}: Props) {
  const [form, setForm] = useState<SongForm>({
    title: "",
    artist: "",
    genreId: 0
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initial ? "Edit song" : "Create song"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", gap: 2, mt: 1 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          fullWidth
        />
        <TextField
          label="Artist"
          value={form.artist}
          onChange={(e) => setForm({ ...form, artist: e.target.value })}
          fullWidth
        />
        <TextField
          select
          label="Genre"
          value={form.genreId}
          onChange={(e) =>
            setForm({ ...form, genreId: Number(e.target.value) })
          }
          fullWidth
        >
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
