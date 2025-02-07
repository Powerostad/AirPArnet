import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useBooking = (id) => {
  return useMutation({
    mutationKey: ["booking", id],
    mutationFn: async (data) => {
      const response = await apiClient.post(`/api/v1/booking/${id}`, data);
      const responseMsg = response.data.booking_id;
      localStorage.setItem("bookingId", responseMsg);
      return response.data;
    },
    enabled: !!id,
  });
};

export default useBooking;
