import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById, updateMyHotelById } from "../services/api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery({
    queryKey: ["hotel"],
    queryFn: () => fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateMyHotelById,
    onSuccess: () => {
      showToast({ message: "Updated successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isPending={isPending} />
  );
};

export default EditHotel;
