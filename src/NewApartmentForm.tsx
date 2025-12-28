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

      if (response.status === 201) {
        console.log("Created apartment:", response.data); 
        console.log("Created apartment ID:", response.data.id);
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
      } else {
        console.error("Unexpected status code:", response.status);
      }

    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error("Invalid input data. Please check the form fields.");
            break;
          case 409:
            console.error("Apartment already exists. Duplicate entry.");
            break;
          case 500:
            console.error("Server error. Please try again later.");
            break;
          default:
            console.error("Unexpected error:", error.response.status);
        }
      } else {
        console.error("Network error. Could not reach server:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="new-apartment-form">
      <input data-testid="new-street" type="text" name="street" placeholder="Street" onChange={handleChange} value={formData.street} required />
      <input data-testid="new-address" type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} required />
      <input data-testid="new-number" type="number" name="apartment_number" placeholder="Apartment Number" onChange={handleChange} value={formData.apartment_number === 0 ? "" : formData.apartment_number} required />
      <input data-testid="new-size" type="number" name="size_sq_m" placeholder="Size (sq.m)" onChange={handleChange} value={formData.size_sq_m === 0 ? "" : formData.size_sq_m} required />
      <input data-testid="new-rent" type="number" name="rent_cost" placeholder="Rent Cost" onChange={handleChange} value={formData.rent_cost === 0 ? "" : formData.rent_cost} required />
      <input data-testid="new-city" type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} required />
      <button type="submit">Add Apartment</button>
    </form>
  );
};

export default NewApartmentForm;
