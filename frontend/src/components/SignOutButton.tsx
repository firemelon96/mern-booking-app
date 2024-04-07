import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../services/api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      showToast({ message: "Logged out successfully", type: "SUCCESS" });
      queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onLogout = () => {
    mutate();
  };

  return (
    <button
      onClick={onLogout}
      className="bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
