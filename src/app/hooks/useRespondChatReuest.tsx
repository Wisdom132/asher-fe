import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const respondChatRequest = async ({
  requestId,
  accept,
}: {
  requestId: string;
  accept: boolean;
}) => {
  const response = await api.patch(`/chat/respond/${requestId}`, { accept });
  return response.data;
};

export const useRespondChatRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondChatRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatRequests"] });
    },
  });
};
