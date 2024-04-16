import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isPending: boolean;
  hotel?: HotelType;
};

const ManageHotelForm = ({ onSave, isPending, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = (formData: HotelFormData) => {
    const data = new FormData();
    if (hotel) {
      data.append("hotelId", hotel._id);
    }
    data.append("name", formData.name);
    data.append("city", formData.city);
    data.append("country", formData.country);
    data.append("description", formData.description);
    data.append("type", formData.type);
    data.append("pricePerNight", formData.pricePerNight.toString());
    data.append("starRating", formData.starRating.toString());
    data.append("adultCount", formData.adultCount.toString());
    data.append("childCount", formData.childCount.toString());

    formData.facilities.forEach((facility, index) => {
      data.append(`facilities[${index}]`, facility);
    });

    if (formData.imageUrls) {
      formData.imageUrls.forEach((url, index) => {
        data.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formData.imageFiles).forEach((imageFile) => {
      data.append("imageFiles", imageFile);
    });

    onSave(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isPending}
            type="submit"
            className="bg-blue-600 p-2 font-bold text-white hover:bg-blue-500 disabled:bg-gray-500"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
