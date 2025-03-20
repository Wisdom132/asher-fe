import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const fetchConnectionRequests = async () => {
  const response = await api.get("/connections/requests");
  return response.data;
};

export const useConnectionRequests = () => {
  return useQuery({
    queryKey: ["connectionRequests"],
    queryFn: fetchConnectionRequests,
  });
};
