import React from "react";
import axios from "axios";

interface DeleteApartmentProps {
  apartmentId: number;
  apartmentNumber: number;
  street: string;
  address: string;
  size: number;
  rent: number;
  city: string;
  onApartmentDeleted: (id: number) => void;
}


const DeleteApartment: React.FC<DeleteApartmentProps> = ({
  apartmentId,
  apartmentNumber,
  street,
  address,
  size,
  rent,
  city,
  onApartmentDeleted
}) => {
  const handleApartmentDelete = async () => {
    try {
      console.log("Attempting to DELETE apartment with ID:", apartmentId);
      //await axios.delete(`/api/apartments?id=${apartmentId}`);
      await axios.delete(`/api/apartments/${apartmentId}`);
      console.log("Successfully deleted apartment:", apartmentId);
      onApartmentDeleted(apartmentId); // Remove from UI after successful deletion
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            console.error("Apartment not found");
            break;
          case 400:
            console.error("Invalid apartment ID");
            break;
          case 401:
          case 403:
            console.error("Not authorized to delete this apartment");
            break;
          default:
            console.error("Server error:", error);
        }
      } else {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <button className="btn btn-danger" data-testid="delete-button" onClick={handleApartmentDelete}>Delete</button>
  );
};

export default DeleteApartment;
