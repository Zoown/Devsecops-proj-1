import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import DeleteApartment from "../../src/DeleteApartment";

console.log("Starting test: deleteApartments");

vi.mock("axios");
const mockedAxios = axios as unknown as {
  delete: ReturnType<typeof vi.fn>;
};

describe("DeleteApartment with button click", () => {
  // Success case
  it("calls axios.delete and onApartmentDeleted when Delete button is clicked", async () => {
    mockedAxios.delete = vi.fn().mockResolvedValueOnce({});
    const onApartmentDeleted = vi.fn();

    render(
      <DeleteApartment
        apartmentId={123}
        apartmentNumber={205}
        onApartmentDeleted={onApartmentDeleted}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith("/api/apartments/123");
    });
    expect(onApartmentDeleted).toHaveBeenCalledWith(123);
  });

  // Failure case
  it("incorrect apartmentId", async () => {
    mockedAxios.delete = vi.fn().mockRejectedValueOnce(new Error("Apartment not found"));
    const onApartmentDeleted = vi.fn();

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <DeleteApartment
        apartmentId={999} // non-existent ID
        apartmentNumber={999}
        onApartmentDeleted={onApartmentDeleted}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith("/api/apartments/999");
    });

    expect(onApartmentDeleted).not.toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Network error:",
      expect.any(Error)
    );

    // Cleanup
    consoleSpy.mockRestore();
  });
});