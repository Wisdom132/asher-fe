import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const fetchCompanies = async () => {
    const response = await api.get("/connections/companies");
    return response.data;
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 1000 * 60,
  });
};
