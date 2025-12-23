import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export function GenresPage() {
  const queryClient = useQueryClient();
  const [newGenreName, setNewGenreName] = useState("");
  const [editGenreId, setEditGenreId] = useState<number | null>(null);
  const [editGenreName, setEditGenreName] = useState("");

  // GET genres
  const { data, isLoading, error } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5106/api/Genres");
      return res.data;
    },
  });

  // POST genre
  const addGenreMutation = useMutation({
    mutationFn: async (genre: { name: string }) => {
      await axios.post("http://localhost:5106/api/Genres", { Name: genre.name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      setNewGenreName("");
      toast.success("Genre added successfully!");
    },
  });

  // PUT genre
  const updateGenreMutation = useMutation({
    mutationFn: async (genre: { id: number; name: string }) => {
      await axios.put(`http://localhost:5106/api/Genres/${genre.id}`, { Name: genre.name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      setEditGenreId(null);
      setEditGenreName("");
      toast.success("Genre updated successfully!");
    },
  });

  // DELETE genre
  const deleteGenreMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:5106/api/Genres/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      toast.success("Genre deleted successfully!");
    },
  });

  if (isLoading) return <p>Loading genres...</p>;
  if (error) return <p>Error loading genres</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Toaster position="top-right" />
      <h2>Genres</h2>

      {/* Add genre form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newGenreName.trim()) {
            addGenreMutation.mutate({ name: newGenreName });
          }
        }}
        style={{ marginBottom: "20px" }}
      >
        <TextField
          label="New Genre"
          value={newGenreName}
          onChange={(e) => setNewGenreName(e.target.value)}
          size="small"
          style={{ marginRight: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Genre
        </Button>
      </form>

      {/* Genres table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((genre: any) => (
              <TableRow key={genre.id}>
                <TableCell>{genre.id}</TableCell>
                <TableCell>
                  {editGenreId === genre.id ? (
                    <TextField
                      value={editGenreName}
                      onChange={(e) => setEditGenreName(e.target.value)}
                      size="small"
                    />
                  ) : (
                    genre.name
                  )}
                </TableCell>
                <TableCell align="right">
                  {editGenreId === genre.id ? (
                    <>
                      <Button
                        onClick={() =>
                          updateGenreMutation.mutate({ id: genre.id, name: editGenreName })
                        }
                        variant="contained"
                        color="success"
                        size="small"
                        style={{ marginRight: "5px" }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditGenreId(null)}
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
                          setEditGenreId(genre.id);
                          setEditGenreName(genre.name);
                        }}
                        variant="outlined"
                        size="small"
                        style={{ marginRight: "5px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteGenreMutation.mutate(genre.id)}
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
