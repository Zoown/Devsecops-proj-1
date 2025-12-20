import React, { useState } from "react";
import axios from "axios";
import { Apartment } from "./App";

interface UpdateApartmentFormProps {
  apartmentId: number; // ID of the apartment to update
  initialData: Apartment; // Pre-fill form with existing data
  onApartmentUpdated: (updatedApartment: Apartment) => void;
}

const UpdateApartmentForm: React.FC<UpdateApartmentFormProps> = ({
  apartmentId,
  initialData,
  onApartmentUpdated,
}) => {
  const [formData, setFormData] = useState<Apartment>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/apartments/${apartmentId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        onApartmentUpdated(response.data);
        console.log("Apartment updated successfully:", response.data);
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error("Invalid update data. Please check the form fields.");
            break;
          case 404:
            console.error("Apartment not found.");
            break;
          case 409:
            console.error("Conflict: Duplicate apartment number or address.");
            break;
          default:
            console.error("Server error:", error.response.status);
        }
      } else {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="street"
        placeholder="Street"
        onChange={handleChange}
        value={formData.street}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleChange}
        value={formData.address}
        required
      />
      <input
        type="number"
        name="apartment_number"
        placeholder="Apartment Number"
        onChange={handleChange}
        value={formData.apartment_number}
        required
      />
      <input
        type="number"
        name="size_sq_m"
        placeholder="Size (sq.m)"
        onChange={handleChange}
        value={formData.size_sq_m}
        required
      />
      <input
        type="number"
        name="rent_cost"
        placeholder="Rent Cost"
        onChange={handleChange}
        value={formData.rent_cost}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
        value={formData.city}
        required
      />
      <button type="submit">Update Apartment</button>
    </form>
  );
};

export default UpdateApartmentForm;
