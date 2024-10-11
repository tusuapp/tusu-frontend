import { api } from "api";
import { useQuery } from "react-query";

const useTutorReviews = (id: any, enabled: boolean) => {
  return useQuery(
    ["tutorReviews", id],
    async () => {
      const { data } = await api.get(`/reviews/tuor/${id}`);
      return data.result;
    },
    { enabled: enabled }
  );
};

export default useTutorReviews;
