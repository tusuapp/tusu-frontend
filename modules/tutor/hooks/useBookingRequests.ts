import { api } from "api";
import { useQuery } from "react-query";

const useBookingRequests = () => {
  // return useQuery("bookingRequests", async () => {
  //   const { data } = await api.get("/tutor/my-bookings/?status_eq=pending");
  //   return data.result;
  // });


  return useQuery("bookingRequests", async () => {
    const { data } = await api.get("/tutor/dashboard");
    return data.result;
  });
};

export default useBookingRequests;
