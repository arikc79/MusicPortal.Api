import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// створюємо інстанс axios
const api = axios.create({ baseURL: "http://localhost:5000/api" });

// 🔹 отримати всі жанри
export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => (await api.get("/genres")).data,
  });
}

// 🔹 додати жанр
export function useAddGenre() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGenre: { name: string }) => api.post("/genres", newGenre),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["genres"] }),
  });
}

// 🔹 оновити жанр
export function useUpdateGenre() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (genre: { id: number; name: string }) =>
      api.put(`/genres/${genre.id}`, genre),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["genres"] }),
  });
}

// 🔹 видалити жанр
export function useDeleteGenre() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/genres/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["genres"] }),
  });
}
