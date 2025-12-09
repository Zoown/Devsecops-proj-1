import React from "react";
import axios from "axios";

interface DeleteApartmentProps {
  apartmentId: number;
  apartmentNumber: number;
  onApartmentDeleted: (id: number) => void;
}

const DeleteApartment: React.FC<DeleteApartmentProps> = ({ apartmentId, apartmentNumber, onApartmentDeleted }) => {
  const handleApartmentDelete = async () => {
    try {
      console.log("Attempting to DELETE apartment with ID:", apartmentId);
      //await axios.delete(`/api/apartments?id=${apartmentId}`);
      await axios.delete(`/api/apartments/${apartmentId}`);
      onApartmentDeleted(apartmentId); // Remove from UI after successful deletion
    } catch (error) {
      console.error("Error deleting apartment:", error);
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="mb-0 fw-bold">{apartmentNumber}</p>
        <button className="btn btn-danger" onClick={handleApartmentDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteApartment;
