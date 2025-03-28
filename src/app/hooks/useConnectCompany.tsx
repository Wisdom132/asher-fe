import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { toast } from "react-toastify";

const connectCompanyRequest = async (companyId: string) => {
  const response = await api.post(`/connections/request`, { companyId });
  return response.data;
};

export const useConnectCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: connectCompanyRequest,
    onSuccess: (data, companyId) => {
      // Update the cache after a successful connection
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success('Connection request Sent');
    },
    onError: (error) => {
      console.error("Failed to connect:", error);
      toast.success("Error sending connection request");
    },
  });
};
