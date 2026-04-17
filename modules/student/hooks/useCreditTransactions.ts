import { v2api } from "api";
import { useQuery } from "react-query";

const useCreditTransactions = (page = 0, size = 20) => {
  return useQuery(["credPointsTransactions", page, size], async () => {
    const { data } = await v2api.get(
      `/user/payments/transactions?page=${page}&size=${size}`
    );
    return data;
  });
};

export default useCreditTransactions;
