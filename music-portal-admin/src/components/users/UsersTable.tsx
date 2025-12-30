import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserForm } from "./UserDialog";

type Props = {
  users: UserForm[];
  onEdit: (u: UserForm) => void;
  onDelete: (id: number) => void;
};

export function UsersTable({ users, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.role}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onEdit(u)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(u.id!)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
