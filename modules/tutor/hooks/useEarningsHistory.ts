import { v2api } from "api";
import { useQuery } from "react-query";

const useEarningsHistory = (page = 0, size = 20) => {
  return useQuery(["tutorEarningsHistory", page, size], async () => {
    const { data } = await v2api.get(
      `/user/profile/tutor/earnings?page=${page}&size=${size}`
    );
    return data;
  });
};

export default useEarningsHistory;
