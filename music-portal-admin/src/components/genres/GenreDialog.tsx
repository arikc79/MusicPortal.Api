import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { useEffect, useState } from "react";

export type GenreForm = {
  id?: number;
  name: string;
};

type Props = {
  open: boolean;
  initial?: GenreForm | null;
  onClose: () => void;
  onSave: (data: GenreForm) => void;
};

export function GenreDialog({ open, initial, onClose, onSave }: Props) {
  const [form, setForm] = useState<GenreForm>({ name: "" });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initial ? "Edit genre" : "Create genre"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          fullWidth
          autoFocus
        />
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
