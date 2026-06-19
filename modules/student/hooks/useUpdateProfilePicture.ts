import { v2api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const updateProfilePicture = async (form: any, setImageId: any) => {
  // The v2api instance has Content-Type: application/json as a default header.
  // axios calls xhr.setRequestHeader() with that value BEFORE xhr.send(formData),
  // and Chrome respects the explicit header — so the multipart boundary never gets
  // set and the server returns 400. transformRequest runs before setRequestHeader,
  // so deleting from the (deep-copied) headers object here is the reliable fix.
  const { data } = await v2api.post("/user/profile/photo", form, {
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
