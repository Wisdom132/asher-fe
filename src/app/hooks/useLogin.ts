import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const loginUser = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('data from login', data)
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user))
      window.location.href = "/dashboard/connections";
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
