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
import { SongForm } from "./SongDialog";

type Props = {
  songs: (SongForm & { genreName?: string })[];
  onEdit: (s: SongForm) => void;
  onDelete: (id: number) => void;
};

export function SongsTable({ songs, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Genre</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {songs.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{s.title}</TableCell>
            <TableCell>{s.artist}</TableCell>
            <TableCell>{s.genreName ?? s.genreId}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onEdit(s)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(s.id!)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
