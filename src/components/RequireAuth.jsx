import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/auth/requireAuth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{user ? children : navigate("/login")}</>;
}
