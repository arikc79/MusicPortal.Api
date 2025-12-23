import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField
} from "@mui/material";
import toast from "react-hot-toast";

export function UsersPage() {
  const queryClient = useQueryClient();

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");

  // GET users
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5106/api/Users");
      return res.data;
    },
  });

  // POST user
  const addUserMutation = useMutation({
    mutationFn: async (user: { name: string; email: string }) => {
      await axios.post("http://localhost:5106/api/Users", {
        Name: user.name,
        Email: user.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setNewUserName("");
      setNewUserEmail("");
      toast.success("User added successfully!");
    },
  });

  // PUT user
  const updateUserMutation = useMutation({
    mutationFn: async (user: { id: number; name: string; email: string }) => {
      await axios.put(`http://localhost:5106/api/Users/${user.id}`, {
        Id: user.id,
        Name: user.name,
        Email: user.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditUserId(null);
      setEditUserName("");
      setEditUserEmail("");
      toast.success("User updated successfully!");
    },
  });

  // DELETE user
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:5106/api/Users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully!");
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>

      {/* Add user form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newUserName.trim() && newUserEmail.trim()) {
            addUserMutation.mutate({
              name: newUserName,
              email: newUserEmail,
            });
          }
        }}
        style={{ marginBottom: "20px" }}
      >
        <TextField
          label="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          size="small"
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          size="small"
          style={{ marginRight: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </form>

      {/* Users table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {editUserId === user.id ? (
                    <TextField
                      value={editUserName}
                      onChange={(e) => setEditUserName(e.target.value)}
                      size="small"
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editUserId === user.id ? (
                    <TextField
                      value={editUserEmail}
                      onChange={(e) => setEditUserEmail(e.target.value)}
                      size="small"
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell align="right">
                  {editUserId === user.id ? (
                    <>
                      <Button
                        onClick={() =>
                          updateUserMutation.mutate({
                            id: user.id,
                            name: editUserName,
                            email: editUserEmail,
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
                        onClick={() => setEditUserId(null)}
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
                          setEditUserId(user.id);
                          setEditUserName(user.name);
                          setEditUserEmail(user.email);
                        }}
                        variant="outlined"
                        size="small"
                        style={{ marginRight: "5px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteUserMutation.mutate(user.id)}
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
