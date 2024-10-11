import { api } from "api";
import { useQuery } from "react-query";

const useInitialFormData = () => {
  return useQuery("initialFormData", async () => {
    const { data } = await api.get(
      "/category?modules=subject,discipline,timezone,languages"
    );
    return data.result;
  });
};

export default useInitialFormData;
