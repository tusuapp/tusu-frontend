import { api } from "api";
import { useQuery } from "react-query";

const useChatUserList = () => {
  return useQuery("chatUserList", async () => {
    // const { data } = await api.get("/chat/request/users");
    // return data.result;
    return []
  });
};

export default useChatUserList;
