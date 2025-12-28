import { Apartment } from "./Apartment";
import DeleteApartment from "./DeleteApartment";
import UpdateApartmentForm from "./UpdateApartmentForm";
import { useState } from "react";

interface ApartmentCardProps {
  apt: Apartment;
  onApartmentDeleted: (id: number) => void;
  onApartmentUpdated: (updated: Apartment) => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apt, onApartmentDeleted, onApartmentUpdated }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="card shadow-sm mb-3" data-testid="apartment-card">
      <div className="card-body d-flex justify-content-between align-items-center">

        <p className="mb-0 fw-bold">
          #{apt.apartment_number} — {apt.street} — {apt.city}
        </p>

        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => setEditing(!editing)}
          >
            Edit
          </button>

          <DeleteApartment
            apartmentId={apt.id ?? 0}
            apartmentNumber={apt.apartment_number}
            street={apt.street}
            address={apt.address}
            size={apt.size_sq_m}
            rent={apt.rent_cost}
            city={apt.city}
            onApartmentDeleted={onApartmentDeleted}
          />
        </div>
      </div>

      {editing && (
        <div className="mt-3" data-testid="update-apartment-form">
          <UpdateApartmentForm
            apartmentId={apt.id ?? 0}
            initialData={apt}
            onApartmentUpdated={(updated) => {
              onApartmentUpdated(updated);
              setEditing(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ApartmentCard;
