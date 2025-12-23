import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// створюємо інстанс axios
const api = axios.create({ baseURL: "http://localhost:5000/api" });

// 🔹 отримати всіх користувачів
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => (await api.get("/users")).data,
  });
}

// 🔹 додати користувача
export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser: { name: string; email: string }) =>
      api.post("/users", newUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

// 🔹 оновити користувача
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: { id: number; name: string; email: string }) =>
      api.put(`/users/${user.id}`, user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

// 🔹 видалити користувача
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
