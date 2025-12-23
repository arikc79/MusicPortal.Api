import { useSongs, useAddSong, useUpdateSong, useDeleteSong } from "../api/songs";

export function SongList() {
  const { data: songs, isLoading } = useSongs();
  const addSong = useAddSong();
  const updateSong = useUpdateSong();
  const deleteSong = useDeleteSong();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Songs</h2>
      <ul>
        {songs.map((s: any) => (
          <li key={s.id}>
            {s.title} — {s.artist} (GenreId: {s.genreId})
            <button
              onClick={() =>
                updateSong.mutate({ id: s.id, title: "Updated Song", artist: s.artist, genreId: s.genreId })
              }
            >
              Edit
            </button>
            <button onClick={() => deleteSong.mutate(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          addSong.mutate({ title: "New Song", artist: "Unknown", genreId: 1 })
        }
      >
        Add Song
      </button>
    </div>
  );
}
