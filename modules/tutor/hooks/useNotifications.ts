import { api, v2api } from "api";
import { useInfiniteQuery, useQuery } from "react-query";

const useNotifications = () => {
  return useQuery("notificationsList", async () => {
    const res = await v2api.get("/notifications");
    return res.data;
  });
};

export default useNotifications;
