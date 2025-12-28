import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  //  якщо немає токена — на login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // якщо токен є — пускаємо
  return children;
}
