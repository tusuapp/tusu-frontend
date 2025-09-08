import { api, v2api } from "api";
import { useInfiniteQuery, useQuery } from "react-query";

const useNotifications = () => {
  return useQuery("notificationsList", async ({ pageParam = 1 }) => {
    const res = await v2api.get("/notifications");
    return res.data;
  });
};

export default useNotifications;
