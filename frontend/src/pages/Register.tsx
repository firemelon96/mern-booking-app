import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      showToast({ message: "User registered successfully", type: "SUCCESS" });
      queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <label
          htmlFor="first name"
          className="flex-1 text-sm font-bold text-gray-700"
        >
          First Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors?.firstName?.message && (
            <span className="text-rose-500">{errors.firstName.message}</span>
          )}
        </label>
        <label
          htmlFor="last name"
          className="flex-1 text-sm font-bold text-gray-700"
        >
          Last Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors?.lastName?.message && (
            <span className="text-rose-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label htmlFor="email" className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors?.email?.message && (
          <span className="text-rose-500">{errors.email.message}</span>
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
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at 6 characters",
            },
          })}
        />
        {errors?.password?.message && (
          <span className="text-rose-500">{errors.password.message}</span>
        )}
      </label>
      <label
        htmlFor="confirm password"
        className="flex-1 text-sm font-bold text-gray-700"
      >
        Confirm password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password did not match",
          })}
        />
        {errors?.confirmPassword?.message && (
          <span className="text-rose-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-800 p-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          Create account
        </button>
      </span>
    </form>
  );
};

export default Register;
