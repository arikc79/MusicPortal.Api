import { useUsers, useAddUser, useUpdateUser, useDeleteUser } from "../api/users";

export function UserList() {
  const { data: users, isLoading } = useUsers();
  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => updateUser.mutate({ id: u.id, name: "Updated", email: u.email })}>
              Edit
            </button>
            <button onClick={() => deleteUser.mutate(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addUser.mutate({ name: "New User", email: "new@music.com" })}>
        Add User
      </button>
    </div>
  );
}
