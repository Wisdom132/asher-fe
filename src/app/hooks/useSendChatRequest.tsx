import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";



const sendChatRequest = async (companyId: string) => {
  const response = await api.post("/chats/request", { companyId });
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
