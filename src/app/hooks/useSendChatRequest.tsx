import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";

interface SendChatRequestPayload {
  companyId: string;
}

const sendChatRequest = async ({ companyId }: SendChatRequestPayload) => {
  const response = await api.post("/chat/requests", { companyId });
  return response.data;
};

export const useSendChatRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendChatRequest,
    onSuccess: () => {
      // Invalidate chat requests so the UI updates automatically
      queryClient.invalidateQueries({ queryKey: ["chatRequests"] });
    },
  });
};
