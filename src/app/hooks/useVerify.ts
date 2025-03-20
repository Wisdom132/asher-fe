import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const verifyEmail = async (otp: string) => {
  const userEmail = localStorage.getItem("user-email");
  const response = await api.post("/auth/verify-email", {
    otp,
    email: userEmail,
  });
  return response.data;
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      window.location.href = "/auth/login"; 
    },
    onError: (error) => {
      console.error("Email verification failed:", error);
    },
  });
};
