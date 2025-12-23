import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// створюємо інстанс axios
const api = axios.create({ baseURL: "http://localhost:5000/api" });

// 🔹 отримати всі пісні
export function useSongs() {
  return useQuery({
    queryKey: ["songs"],
    queryFn: async () => (await api.get("/songs")).data,
  });
}

// 🔹 додати пісню
export function useAddSong() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSong: { title: string; artist: string; genreId: number }) =>
      api.post("/songs", newSong),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["songs"] }),
  });
}

// 🔹 оновити пісню
export function useUpdateSong() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (song: { id: number; title: string; artist: string; genreId: number }) =>
      api.put(`/songs/${song.id}`, song),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["songs"] }),
  });
}

// 🔹 видалити пісню
export function useDeleteSong() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/songs/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["songs"] }),
  });
}
