import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Guests</h2>
      <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
        <label htmlFor="adult" className="text-sm font-semibold text-gray-700">
          Adult
          <input
            type="number"
            className="w-full rounded border px-3 py-2 font-normal"
            min={1}
            {...register("adultCount", {
              required: "This field os required",
            })}
          />
          {errors.adultCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label htmlFor="adult" className="text-sm font-semibold text-gray-700">
          Children
          <input
            type="number"
            className="w-full rounded border px-3 py-2 font-normal"
            min={1}
            {...register("childCount", {
              required: "This field os required",
            })}
          />
          {errors.childCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
