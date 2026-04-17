import { v2api } from "api";
import { useQuery } from "react-query";

const useCreditPoints = () => {
  return useQuery("creditPoints", async () => {
    const { data } = await v2api.get("/user/credits/balance");
    return data;
  });
};

export default useCreditPoints;
