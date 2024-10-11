import { api } from "api";
import { useQuery } from "react-query";

const useEarningsHistory = () => {
  return useQuery("tutorEarningsHistory", async () => {
    const { data } = await api.get("/tutor/my-earnings-history");
    
    return data.result;
  });
};

export default useEarningsHistory;
