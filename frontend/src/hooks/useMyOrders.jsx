import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useMyOrders = (id, page) => {
  return useQuery({
    queryKey: ["orders", id, page],
    queryFn: async () => {
      const params = {};
      if (page) params.page = page;
      const response = await apiClient.get(`/api/v1/orders/${id}`, { params });
      return response.data;
    },
    enabled: !!id,
  });
};

export default useMyOrders;
