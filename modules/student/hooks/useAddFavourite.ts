import { v2api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const addFavourite = async (tutorId: string | number) => {
  const { data } = await v2api.post(`/user/favourites/${tutorId}`);
  return data;
};

const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation((tutorId: string | number) => addFavourite(tutorId), {
    onSuccess: () => {
      toast.success("Tutor added to favourites");
      queryClient.invalidateQueries("favouriteTutors");
    },
    onError: () => {
      toast.error("Failed to add tutor to favourites");
    },
  });
};

export default useAddFavourite;
