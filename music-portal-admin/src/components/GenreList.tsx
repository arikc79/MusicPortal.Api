import { useGenres, useAddGenre, useUpdateGenre, useDeleteGenre } from "../api/genres";

export function GenreList() {
  const { data: genres, isLoading } = useGenres();
  const addGenre = useAddGenre();
  const updateGenre = useUpdateGenre();
  const deleteGenre = useDeleteGenre();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {genres.map((g: any) => (
          <li key={g.id}>
            {g.name}
            <button onClick={() => updateGenre.mutate({ id: g.id, name: "Updated Genre" })}>
              Edit
            </button>
            <button onClick={() => deleteGenre.mutate(g.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addGenre.mutate({ name: "New Genre" })}>
        Add Genre
      </button>
    </div>
  );
}
