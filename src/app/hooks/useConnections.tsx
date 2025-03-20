import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const fetchConnections = async () => {
  const response = await api.get("/connections");
  return response.data;
};

export const useConnections = () => {
  return useQuery({
    queryKey: ["connections"],
    queryFn: fetchConnections,
  });
};
