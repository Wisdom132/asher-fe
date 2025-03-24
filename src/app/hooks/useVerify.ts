import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { toast } from "react-toastify";

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
      toast("Account verified successfully")
      window.location.href = "/auth/login"; 
    },
    onError: (error) => {
      toast("Error verifying account");
      console.error("Email verification failed:", error);
    },
  });
};
