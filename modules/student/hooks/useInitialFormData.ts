import { api, v2api } from "api";
import { useQuery } from "react-query";

const useInitialFormData = () => {
  return useQuery("initialFormData", async () => {
    const { data } = await v2api.get(
      "/dropdowns?types=subject,discipline,timezone,languages,countries"
    );
    return data;
  });
};

export default useInitialFormData;
