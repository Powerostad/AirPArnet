import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useBookingPayment = (userId, bookingId) => {
  return useMutation({
    mutationKey: ["booking", userId, bookingId],
    mutationFn: async () => {
      const response = await apiClient.post(
        `/api/v1/booking/${userId}/${bookingId}`
      );
      return response.data;
    },
    enabled: !!userId,
  });
};

export default useBookingPayment;
