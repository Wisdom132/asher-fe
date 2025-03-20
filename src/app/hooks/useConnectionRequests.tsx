import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

export enum ConnectionStatus {
    PENDING= 'PENDING',
  ACCEPTED= 'ACCEPTED',
  DECLINED= 'DECLINED'
}

const fetchConnectionRequests = async (statuses?: ConnectionStatus[]) => {
  const params = statuses ? { statuses } : {};
  const response = await api.get("/connections/requests", { params });
  return response.data;
};

export const useConnectionRequests = (statuses?: ConnectionStatus[]) => {
  return useQuery({
    queryKey: ["connectionRequests", statuses],
    queryFn: () => fetchConnectionRequests(statuses),
  });
};
