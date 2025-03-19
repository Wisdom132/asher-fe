import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert(
        "Registration successful! Check your email to verify your account."
      );
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};
