import { api } from "api";
import { useQuery } from "react-query";

const useClassBookings = () => {
  return useQuery(["classBookings"], async () => {
    const { data } = await api.get(`/student/my-bookings/`);
    return data.result;
  });
};

export default useClassBookings;
