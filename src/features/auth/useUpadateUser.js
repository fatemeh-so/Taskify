import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editUser } from "../../services/authApi";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: editUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
      // console.log(user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
