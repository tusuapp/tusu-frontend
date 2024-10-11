import { api } from "api";
import { useInfiniteQuery } from "react-query";

const useNotifications = () => {
  return useInfiniteQuery(
    "notificationsList",
    async ({ pageParam = 1 }) => {
      const res = await api.get(
        "/notification/list?limit=10&page=" + pageParam
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );
};

export default useNotifications;
