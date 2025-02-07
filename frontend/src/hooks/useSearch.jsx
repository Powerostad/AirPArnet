import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useSearch = ({
  two_sided,
  flight_type,
  departure_city,
  arrival_city,
  departure_time,
  arrival_time,
  adult_passengers,
  child_passengers,
  baby_passengers,
  airline,
  page,
  per_page,
}) => {
  return useQuery({
    queryKey: [
      "search",
      two_sided,
      flight_type,
      departure_city,
      arrival_city,
      departure_time,
      arrival_time,
      adult_passengers,
      child_passengers,
      baby_passengers,
      airline,
      page,
      per_page,
    ],
    queryFn: async () => {
      console.log("Query Parameters:", {
        departure_city,
        arrival_city,
        two_sided,
        flight_type,
        departure_time,
        arrival_time,
        adult_passengers,
        child_passengers,
        baby_passengers,
        airline,
        page,
        per_page,
      });
      console.log(departure_city);
      const params = {};
      if (two_sided) params.two_sided = two_sided;
      if (flight_type) params.flight_type = flight_type;
      if (departure_city) params.departure_city = departure_city;
      if (arrival_city) params.arrival_city = arrival_city;
      if (departure_time) params.departure_time = departure_time;
      console.log(departure_city);
      if (arrival_time) params.arrival_time = arrival_time;
      if (adult_passengers) params.adult_passengers = adult_passengers;
      if (child_passengers) params.child_passengers = child_passengers;
      if (baby_passengers) params.baby_passengers = baby_passengers;
      if (airline) params.airline = airline;
      if (page) params.page = page;
      if (per_page) params.per_page = per_page;
      console.log(params);

      if (two_sided) {
        if (!departure_city || !arrival_city) {
          throw new Error(
            "Both departure_city and arrival_city are required for a two-sided flight."
          );
        }
        params.two_sided = two_sided;
      }

      const response = await apiClient.get(`/api/v1/search`, { params });
      return response.data;
    },
    enabled: !two_sided || (departure_city && arrival_city),
  });
};

export default useSearch;
