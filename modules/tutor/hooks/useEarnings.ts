import { api } from "api";
import { useQuery } from "react-query";

const useEarnings = (filter: string) => {
  // return useQuery(["tutorEarnings", filter], async () => {
  //   const { data } = await api.get(`/tutor/my-earnings?filter=${filter}`);
  //   return data.result;
  // });
};

export default useEarnings;
