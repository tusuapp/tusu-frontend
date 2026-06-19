import { v2api } from "api";
import { useQuery } from "react-query";

const useFavourites = () => {
  return useQuery("favouriteTutors", async () => {
    const { data } = await v2api.get("/user/favourites");
    // v2api endpoints return either { result: [...] } or the array directly
    return Array.isArray(data) ? data : (data?.result ?? []);
  });
};

export default useFavourites;
