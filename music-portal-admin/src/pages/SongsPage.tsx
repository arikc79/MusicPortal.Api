import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField
} from "@mui/material";
import toast from "react-hot-toast";

export function SongsPage() {
  const queryClient = useQueryClient();

  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [editSongId, setEditSongId] = useState<number | null>(null);
  const [editSongTitle, setEditSongTitle] = useState("");
  const [editSongArtist, setEditSongArtist] = useState("");

  // GET songs
  const { data, isLoading, error } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5106/api/Songs");
      return res.data;
    },
  });

  // POST song
  const addSongMutation = useMutation({
    mutationFn: async (song: { title: string; artist: string }) => {
      await axios.post("http://localhost:5106/api/Songs", {
        Title: song.title,
        Artist: song.artist,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      setNewSongTitle("");
      setNewSongArtist("");
      toast.success("Song added successfully!");
    },
  });

  // PUT song
  const updateSongMutation = useMutation({
    mutationFn: async (song: { id: number; title: string; artist: string }) => {
      await axios.put(`http://localhost:5106/api/Songs/${song.id}`, {
        Id: song.id,
        Title: song.title,
        Artist: song.artist,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      setEditSongId(null);
      setEditSongTitle("");
      setEditSongArtist("");
      toast.success("Song updated successfully!");
    },
  });

  // DELETE song
  const deleteSongMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:5106/api/Songs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast.success("Song deleted successfully!");
    },
  });

  if (isLoading) return <p>Loading songs...</p>;
  if (error) return <p>Error loading songs</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Songs</h2>

      {/* Add song form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newSongTitle.trim() && newSongArtist.trim()) {
            addSongMutation.mutate({
              title: newSongTitle,
              artist: newSongArtist,
            });
          }
        }}
        style={{ marginBottom: "20px" }}
      >
        <TextField
          label="Song Title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          size="small"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Artist"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
          size="small"
          style={{ marginRight: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Song
        </Button>
      </form>

      {/* Songs table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((song: any) => (
              <TableRow key={song.id}>
                <TableCell>{song.id}</TableCell>
                <TableCell>
                  {editSongId === song.id ? (
                    <TextField
                      value={editSongTitle}
                      onChange={(e) => setEditSongTitle(e.target.value)}
                      size="small"
                    />
                  ) : (
                    song.title
                  )}
                </TableCell>
                <TableCell>
                  {editSongId === song.id ? (
                    <TextField
                      value={editSongArtist}
                      onChange={(e) => setEditSongArtist(e.target.value)}
                      size="small"
                    />
                  ) : (
                    song.artist
                  )}
                </TableCell>
                <TableCell align="right">
                  {editSongId === song.id ? (
                    <>
                      <Button
                        onClick={() =>
                          updateSongMutation.mutate({
                            id: song.id,
                            title: editSongTitle,
                            artist: editSongArtist,
                          })
                        }
                        variant="contained"
                        color="success"
                        size="small"
                        style={{ marginRight: "5px" }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditSongId(null)}
                        variant="outlined"
                        color="secondary"
                        size="small"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setEditSongId(song.id);
                          setEditSongTitle(song.title);
                          setEditSongArtist(song.artist);
                        }}
                        variant="outlined"
                        size="small"
                        style={{ marginRight: "5px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteSongMutation.mutate(song.id)}
                        variant="outlined"
                        color="error"
                        size="small"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
