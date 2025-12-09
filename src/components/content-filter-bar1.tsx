// FilterBar.tsx

// Bootstrap stylings used
// p[x/y] = padding
// m[s/b/e] = margin
// Checkbox stylings
// form-check-inline = line the element horizontally instead of vertically
// form-check = adds styling to checkbox/radio button
// form-check-input = adds styling to the checkbox/radio button input.
// form-check-label = adds styling to the checkbox/radio label.
import React from "react";
import "../myCustomStyles.css";

interface FilterBarProps {
  streetFilters: Record<"Street 1" | "Street 2" | "Street 3", boolean>;
  cityFilters: Record<"City A" | "City B" | "City C" | "City D", boolean>;
  onStreetFilterChange: (filter: "Street 1" | "Street 2" | "Street 3") => void;
  onCityFilterChange: (filter: "City A" | "City B" | "City C" | "City D") => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  streetFilters,
  cityFilters,
  onStreetFilterChange,
  onCityFilterChange,
}) => {
  return (
    <div className="bg-light py-2 px-3 mb-3">
      <span className="fw-bold me-3">Filter</span>
      <div>
        <span className="me-2">Streets:</span>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="street1"
            checked={streetFilters["Street 1"]}
            onChange={() => onStreetFilterChange("Street 1")}
          />
          <label className="form-check-label ms-2" htmlFor="street1">
            Street 1
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="street2"
            checked={streetFilters["Street 2"]}
            onChange={() => onStreetFilterChange("Street 2")}
          />
          <label className="form-check-label ms-2" htmlFor="street2">
            Street 2
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="street3"
            checked={streetFilters["Street 3"]}
            onChange={() => onStreetFilterChange("Street 3")}
          />
          <label className="form-check-label ms-2" htmlFor="street3">
            Street 3
          </label>
        </div>
      </div>
      <div>
        <span className="me-2">Cities:</span>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="cityA"
            checked={cityFilters["City A"]}
            onChange={() => onCityFilterChange("City A")}
          />
          <label className="form-check-label ms-2" htmlFor="cityA">
            City A
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="cityB"
            checked={cityFilters["City B"]}
            onChange={() => onCityFilterChange("City B")}
          />
          <label className="form-check-label ms-2" htmlFor="cityB">
            City B
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="cityC"
            checked={cityFilters["City C"]}
            onChange={() => onCityFilterChange("City C")}
          />
          <label className="form-check-label ms-2" htmlFor="cityC">
            City C
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="cityD"
            checked={cityFilters["City D"]}
            onChange={() => onCityFilterChange("City D")}
          />
          <label className="form-check-label ms-2" htmlFor="cityD">
            City D
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
