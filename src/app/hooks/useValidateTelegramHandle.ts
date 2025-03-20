import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios"; // Import the Axios instance

const validateTelegramHandle = async (handle: string) => {
  if (!handle) return null; // Don't fetch if handle is empty
  const response = await api.get(`/telegram/validate-handle?handle=@${handle}`);
  return response.data;
};

export const useValidateTelegramHandle = (handle: string) => {
  const [debouncedHandle, setDebouncedHandle] = useState(handle);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHandle(handle);
    }, 1000); // Adjust debounce delay if needed

    return () => clearTimeout(timer);
  }, [handle]);

  return useQuery({
    queryKey: ["validateTelegram", debouncedHandle],
    queryFn: () => validateTelegramHandle(debouncedHandle),
    enabled: !!debouncedHandle,
    staleTime: 1000 * 60,
    select: (data) => data?.isValid || false,
  });
};
