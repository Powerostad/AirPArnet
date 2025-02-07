import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import useUserStore from "../stores/user-store";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const { login } = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data) =>
      apiClient.post("/api/v1/signup", data).then((response) => {
        console.log(response.data);
        navigate("/");
        login(response.data.id);
        return response.data;
      }),
  });
};

export default useRegister;
