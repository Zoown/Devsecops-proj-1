import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, it, expect } from "vitest";
import type { Apartment } from "../../src/App";
import React from "react";

const mockApartments: Apartment[] = [
  { id: 1, street: "Street 1", city: "City A", apartment_number: 333, size_sq_m: 45, rent_cost: 5000, address: "Main St 1" },
  { id: 2, street: "Street 2", city: "City B", apartment_number: 444, size_sq_m: 60, rent_cost: 7000, address: "Main St 2" },
];

function TestComponent() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  // simulate setting apartments
  React.useEffect(() => {
    setApartments(mockApartments);
  }, []);

  return (
    <div>
      {apartments.map((apt) => (
        <p key={apt.id}>Apartment {apt.apartment_number}</p>
      ))}
    </div>
  );
}

describe("setApartments state update", () => {
  it("updates state with new apartments", () => {
    render(<TestComponent />);
    expect(screen.getByText(/Apartment 333/i)).toBeInTheDocument();
    expect(screen.getByText(/Apartment 444/i)).toBeInTheDocument();
  });
});
