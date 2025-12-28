import { describe, it, expect } from 'vitest';
import { Apartment } from '../../src/App';

const apartments = [
  { id: 1, street: "Street 1", city: "City A", apartment_number: 101, size_sq_m: 45, rent_cost: 5000, address: "Main St 1" },
  { id: 2, street: "Street 2", city: "City B", apartment_number: 201, size_sq_m: 60, rent_cost: 7000, address: "Main St 2" },
  { id: 3, street: "Street 3", city: "City C", apartment_number: 301, size_sq_m: 60, rent_cost: 7000, address: "Main St 3" },
  { id: 4, street: "Street 1", city: "City C", apartment_number: 102, size_sq_m: 60, rent_cost: 7000, address: "Main St 4" },
  { id: 4, street: "Street 1", city: "City B", apartment_number: 122, size_sq_m: 60, rent_cost: 7000, address: "Main St 5" },
];

const streetFilters = { "Street 1": true, "Street 2": false, "Street 3": false };
const cityFilters = { "City A": false, "City B": true, "City C": false, "City D": false };

function filterApartments( apartments: Apartment[], streetFilters: Record<string, boolean>, cityFilters: Record<string, boolean> ) {
  return apartments.filter(
    (apartment) =>
      (streetFilters[apartment.street] || !Object.values(streetFilters).some(Boolean)) &&
      (cityFilters[apartment.city] || !Object.values(cityFilters).some(Boolean))
  );
}

console.log("Starting test: filterApartments");

describe("Apartment filtering", () => {
  it("filters by street and city", () => {
    const result = filterApartments(apartments, streetFilters, cityFilters);
    expect(result).toHaveLength(1); // Street 1 + City B match
  });

  it("returns all when no filters active", () => {
    const noFilters = { "Street 1": false, "Street 2": false, "Street 3": false };
    const noCityFilters = { "City A": false, "City B": false, "City C": false, "City D": false };
    const result = filterApartments(apartments, noFilters, noCityFilters);
    expect(result).toHaveLength(5);
  });
});
