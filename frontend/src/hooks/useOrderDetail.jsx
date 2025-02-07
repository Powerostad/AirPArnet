import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useOrderDetail = (userId, id) => {
  return useQuery({
    queryKey: ["order-detail", userId, id],
    queryFn: () =>
      apiClient
        .get(`/api/v1/orders/${userId}/order_detail/${id}`)
        .then((res) => res.data),
    enabled: !!userId && !!id,
  });
};

export default useOrderDetail;
