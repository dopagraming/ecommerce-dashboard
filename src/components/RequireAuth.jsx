import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/auth/requireAuth");
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }
  return <>{user ? children : navigate("/login")}</>;
}
