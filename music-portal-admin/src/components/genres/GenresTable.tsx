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
import { GenreForm } from "./GenreDialog";

type Props = {
  genres: GenreForm[];
  onEdit: (g: GenreForm) => void;
  onDelete: (id: number) => void;
};

export function GenresTable({ genres, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {genres.map((g) => (
          <TableRow key={g.id}>
            <TableCell>{g.name}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onEdit(g)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(g.id!)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

