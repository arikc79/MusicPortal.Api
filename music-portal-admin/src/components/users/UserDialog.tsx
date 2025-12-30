import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { useEffect, useState } from "react";

export type UserForm = {
  id?: number;
  name: string;
  email: string;
  passwordHash?: string;
  role: string;
};

type Props = {
  open: boolean;
  initial?: UserForm | null;
  onClose: () => void;
  onSave: (data: UserForm) => void;
};

export function UserDialog({ open, initial, onClose, onSave }: Props) {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    passwordHash: "",
    role: "Admin"
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const change =
    (key: keyof UserForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initial ? "Edit user" : "Create user"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", gap: 2, mt: 1 }}>
        <TextField label="Name" value={form.name} onChange={change("name")} fullWidth />
        <TextField label="Email" value={form.email} onChange={change("email")} fullWidth />
        <TextField
          label="Password"
          type="password"
          value={form.passwordHash}
          onChange={change("passwordHash")}
          fullWidth
        />
        <TextField label="Role" value={form.role} onChange={change("role")} fullWidth />
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
