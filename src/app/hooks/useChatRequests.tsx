import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const fetchChatRequests = async () => {
  const response = await api.get("/chats/requests");
  return response.data;
};

export const useChatRequests = () => {
  return useQuery({
    queryKey: ["chatRequests"],
    queryFn: fetchChatRequests,
  });
};
