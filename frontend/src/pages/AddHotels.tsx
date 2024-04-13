import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { addMyHotel } from "../services/api-client";

const AddHotels = () => {
  const { showToast } = useAppContext();
  const { mutate, isPending } = useMutation({
    mutationFn: addMyHotel,
    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isPending={isPending} />;
};

export default AddHotels;
