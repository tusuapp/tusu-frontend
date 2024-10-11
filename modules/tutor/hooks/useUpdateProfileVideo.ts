import { api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const updateProfileVideo = async (schedule: any, setVideoId: any, setIsVideoUploading: any) => {
  const { data } = await api.post("/app/upload-auth-profile?profile_video=true", schedule);
  setVideoId(data?.result?.id)
  setIsVideoUploading(false)
  return data.result;
};

const useUpdateProfileVideo = (setVideoId: any, setIsVideoUploading: any) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => updateProfileVideo(data, setVideoId, setIsVideoUploading), {
    onSuccess: () => {
      toast.success("Profile video uploaded successfully");
    },

    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)

      await queryClient.cancelQueries("tutorSlots");

      // Snapshot the previous value

      const previousTodos = queryClient.getQueryData("tutorSlots");

      // Optimistically update to the new value

      // queryClient.setQueryData("tutorSlots", (old: any) => [...old, newTodo]);

      // Return a context object with the snapshotted value

      return { previousTodos };
    },

    // If the mutation fails, use the context returned from onMutate to roll back

    onError: async (err: any, newTodo, context: any) => {
      const errorMessage = err.response.data.message;

      if (
        Object.keys(errorMessage).length === 0 &&
        errorMessage.constructor === Object
      ) {
        toast.error("Empty message from server");
      }

      if (errorMessage) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Unknown error occured");
      }

      queryClient.setQueryData("tutorSlots", context.previousTodos);
    },

    // Always refetch after error or success:

    onSettled: () => {
      queryClient.invalidateQueries("tutorSlots");
    },
  });
};

export default useUpdateProfileVideo;
