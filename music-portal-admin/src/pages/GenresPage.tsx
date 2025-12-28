import { useEffect, useState } from "react";
import api from "../api/axios";

export function GenresPage() {
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    api.get("/Genres").then(res => setGenres(res.data));
  }, []);

  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {genres.map(g => (
          <li key={g.id}>{g.name}</li>
        ))}
      </ul>
    </div>
  );
}
