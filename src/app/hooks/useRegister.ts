import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  telegramHandle: string;
  userType: string;
  fundOrCompany: string;
}) => {
  const response = await api.post("users/create-user", data);
  return response.data;
};

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast("Account created, please verify account")
     router.push("/auth/verify-email");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      toast("Error creating account");
    },
  });
};
