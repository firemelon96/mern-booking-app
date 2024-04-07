import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signIn } from "../services/api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SigninFormData = {
  email: string;
  password: string;
};

const Signin = ({}) => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      showToast({ message: "Signin successful", type: "SUCCESS" });
      queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });
      navigate("/");
    },
    onError: () => {
      showToast({ message: "Failed to signin", type: "ERROR" });
    },
  });

  const onSubmit = (data: SigninFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label htmlFor="email" className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors?.email?.message && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label
        htmlFor="password"
        className="flex-1 text-sm font-bold text-gray-700"
      >
        Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("password", { required: "This field is required" })}
        />
        {errors?.password?.message && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not registered?{" "}
          <Link to="/register" className="underline">
            Create an account
          </Link>
        </span>
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-500"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};

export default Signin;
