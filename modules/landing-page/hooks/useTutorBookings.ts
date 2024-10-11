import { api } from "api";
import { useQuery } from "react-query";

const useOurTutors = () => {
  return useQuery("tutorBookings", async () => {
    const { data } = await api.get("/tutor/my-bookings/");
    return data.result;
  });
};

export default useOurTutors;
