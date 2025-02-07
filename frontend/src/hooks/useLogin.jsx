import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user-store";

const useLogin = () => {
  const { login } = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const response = await apiClient.post("/api/v1/login", data);
      login(response.data.id);
      return response.data;
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};

export default useLogin;
