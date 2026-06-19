import { v2api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const updateProfilePicture = async (schedule: any, setImageId: any) => {
  // See student hook for explanation — transformRequest is the reliable way to
  // strip Content-Type before axios calls setRequestHeader on the XHR.
  const { data } = await v2api.post("/user/profile/photo", schedule, {
    transformRequest: [(data: any, headers: any) => {
      delete headers["Content-Type"];
      if (headers.common) delete headers.common["Content-Type"];
      if (headers.post) delete headers.post["Content-Type"];
      return data;
    }],
  });

  setImageId(data?.result?.id);
  return data.result;
};

const useUpdateProfiePicture = (setImageId: any) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => updateProfilePicture(data, setImageId), {
    onSuccess: () => {
      toast.success("Profile picture updated successfully");
    },

    onError: () => {
      toast.error("Profile photo update failed. Please try again.");
    },

    onSettled: () => {
      queryClient.invalidateQueries("tutorSlots");
    },
  });
};

export default useUpdateProfiePicture;
