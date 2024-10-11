import { api } from "api";
import { useQuery } from "react-query";

const useGeneralChatHistory = (id: any) => {
  return useQuery(["tutorGeneralChatHistory", id], async () => {
    var config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "X-Auth-Token": "zg62JyKGibuPZcS1x6Rx3AktLeQtisBZ2H8X1AJXjp7",
        "X-User-Id": "mF9KiLWxxKySSYk9u",
      },
    };

    const { data } = await api.get(
      "https://chat.tusustaging.ml/api/v1/im.list",
      config
    );
    return data.result;
  });
};

export default useGeneralChatHistory;
