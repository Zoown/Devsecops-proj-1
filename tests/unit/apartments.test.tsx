
const mockApartments = [
  {
    id: 1,
    street: "Street 1",
    address: "Main St 1",
    apartment_number: 101,
    size_sq_m: 45,
    rent_cost: 5000,
    city: "City A",
  },
  {
    id: 2,
    street: "Street 2",
    address: "Main St 2",
    apartment_number: 202,
    size_sq_m: 60,
    rent_cost: 7000,
    city: "City B",
  },
  {
    id: 3,
    street: "Street 3",
    address: "Main St 3",
    apartment_number: 303,
    size_sq_m: 35,
    rent_cost: 4000,
    city: "City C",
  },
  {
    id: 4,
    street: "Street 1",
    address: "Main St 4",
    apartment_number: 104,
    size_sq_m: 80,
    rent_cost: 9500,
    city: "City D",
  },
  {
    id: 5,
    street: "Street 2",
    address: "Main St 5",
    apartment_number: 205,
    size_sq_m: 55,
    rent_cost: 6500,
    city: "City A",
  },
];
// End of mock data



//Start of tests
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import { describe, expect, it, vi } from "vitest";

console.log("Starting test: apartments");

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockApartments),
  })
) as any;

describe("App apartment fetching", () => {
  it("renders multiple apartments from API", async () => {
    render(
      <MemoryRouter initialEntries={["/apartments"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Apartment 101/i)).toBeInTheDocument()
    );

    // Check if apartments cards are displayed
    expect(screen.getByText(/Apartment 202/i)).toBeInTheDocument();
    expect(screen.getByText(/Apartment 303/i)).toBeInTheDocument();
    expect(screen.getByText(/Apartment 104/i)).toBeInTheDocument();
    expect(screen.getByText(/Apartment 205/i)).toBeInTheDocument();
  });
});
