import React, { useState } from "react";
import axios from "axios";

interface ApartmentFormData {
  street: string;
  address: string;
  apartment_number: number;
  size_sq_m: number;
  rent_cost: number;
  city: string;
}

interface NewApartmentFormProps {
  onApartmentAdded: (newApartment: ApartmentFormData) => void;
}

const NewApartmentForm: React.FC<NewApartmentFormProps> = ({ onApartmentAdded }) => {
  const [formData, setFormData] = useState<ApartmentFormData>({
    street: "",
    address: "",
    apartment_number: 0,
    size_sq_m: 0,
    rent_cost: 0,
    city: "",
  });

  //const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setFormData({ ...formData, [e.target.name]: e.target.value });
  //};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value, // Convert numbers
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    console.log("Submitting form data:", formData); // Debugging

    try {
      const response = await axios.post("/api/apartments", formData, {
        headers: { "Content-Type": "application/json" } // Explicitly set headers
      });
      
      //const response = await axios.post("/api/apartments", {
      //  street: formData.street,
      //  address: formData.address,
      //  apartment_number: formData.apartment_number,
      //  size_sq_m: formData.size_sq_m,
      //  rent_cost: formData.rent_cost,
      //  city: formData.city,
      //}, {
      //  headers: { "Content-Type": "application/json" } // Explicitly set headers
      //});

      onApartmentAdded(response.data); // Update the frontend dynamically

      // Reset the form
      setFormData({
        street: "",
        address: "",
        apartment_number: 0,
        size_sq_m: 0,
        rent_cost: 0,
        city: "",
      });

    } catch (error) {
      console.error("Error adding apartment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="street" placeholder="Street" onChange={handleChange} value={formData.street} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} required />
      <input type="number" name="apartment_number" placeholder="Apartment Number" onChange={handleChange} value={formData.apartment_number === 0 ? "" : formData.apartment_number} required />
      <input type="number" name="size_sq_m" placeholder="Size (sq.m)" onChange={handleChange} value={formData.size_sq_m === 0 ? "" : formData.size_sq_m} required />
      <input type="number" name="rent_cost" placeholder="Rent Cost" onChange={handleChange} value={formData.rent_cost === 0 ? "" : formData.rent_cost} required />
      <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} required />
      <button type="submit">Add Apartment</button>
    </form>
  );
};

export default NewApartmentForm;
