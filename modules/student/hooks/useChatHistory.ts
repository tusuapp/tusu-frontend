import { api } from "api";
import { useQuery } from "react-query";

const useChatHistory = (id: any) => {
  return useQuery(["chatHistory", id], async () => {
   // const { data } = await api.get(`/chat/messages/${id}`);
   //  return data.result;
    return []
  });
};

export default useChatHistory;
