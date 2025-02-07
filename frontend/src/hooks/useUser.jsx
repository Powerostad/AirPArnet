import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useUser = (id) => {
  return useQuery({
    queryKey: ["user", id], 
    queryFn: () => apiClient.get(`/api/v1/users/${id}`).then((res) => res.data),
    enabled: !!id,
  });
};

export default useUser;
