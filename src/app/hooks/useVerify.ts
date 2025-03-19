import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const verifyEmail = async (token: string) => {
  const response = await api.post("/auth/verify-email", { token });
  return response.data;
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      alert("Email verified! You can now log in.");
      window.location.href = "/login"; // Redirect to login after success
    },
    onError: (error) => {
      console.error("Email verification failed:", error);
    },
  });
};
