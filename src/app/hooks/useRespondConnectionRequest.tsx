import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { toast } from "react-toastify";

const respondToRequest = async ({
  requestId,
  accept,
}: {
  requestId: string;
  accept: boolean;
}) => {
  const response = await api.patch(`/connections/respond/${requestId}`, {
    accept,
  });
  return response.data;
};

export const useRespondConnectionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondToRequest,
    onSuccess: (_, { requestId, accept }) => {
      toast("Connection updated successfully")
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast("Error responding to connection request");
      console.error("Failed to respond to request:", error);
    },
  });
};
