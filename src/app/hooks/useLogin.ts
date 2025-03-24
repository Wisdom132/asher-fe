import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { toast } from "react-toastify";

const loginUser = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast("Login successful");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user))
      window.location.href = "/dashboard/connections";
    },
    onError: (error: any) => {
      console.error("Login failed:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Error Logging in");
    },
  });
};
