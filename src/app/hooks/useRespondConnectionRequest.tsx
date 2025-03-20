import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";

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
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      console.error("Failed to respond to request:", error);
    },
  });
};
