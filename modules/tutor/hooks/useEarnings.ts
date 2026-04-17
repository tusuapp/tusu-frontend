import { v2api } from "api";
import { useQuery } from "react-query";

// Fetches summary only (page=0&size=1) — used by sidebar
const useEarnings = (_filter?: string) => {
  return useQuery("tutorEarnings", async () => {
    const { data } = await v2api.get(
      "/user/profile/tutor/earnings?page=0&size=1"
    );
    return data?.summary ?? {};
  });
};

export default useEarnings;
