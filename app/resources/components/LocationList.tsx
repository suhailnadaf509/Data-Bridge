import { useState } from "react";
import type { Category } from "../data/localResources";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import LocationDetails from "./LocationDetails";
import { useEffect } from "react";

interface LocationListProps {
  category: Category;
}

export default function LocationList({ category }: LocationListProps) {
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    phone: "",
    rating: 5,
  });

  const toggleLocation = (locationId: string) => {
    setExpandedLocation(expandedLocation === locationId ? null : locationId);
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    // Assuming category.locations is mutable, otherwise you may need to manage state differently
    category.locations.push({
      id: `loc${category.locations.length + 1}`,
      ...newLocation,
      reviews: [], // Initialize reviews as an empty array
    });
    setNewLocation({ name: "", address: "", phone: "", rating: 5 }); // Reset form
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">
        {category.name}
      </h2>
      <form onSubmit={handleAddLocation} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newLocation.name}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
          className="mr-2"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={newLocation.address}
          onChange={(e) =>
            setNewLocation({ ...newLocation, address: e.target.value })
          }
          className="mr-2"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newLocation.phone}
          onChange={(e) =>
            setNewLocation({ ...newLocation, phone: e.target.value })
          }
          className="mr-2"
          required
        />
        <button
          type="submit"
          className="bg-[#5a5a5a] text-white px-4 py-2 rounded"
        >
          Add Resource
        </button>
      </form>
      {category.locations.length > 0 ? (
        <ul className="space-y-4">
          {category.locations.map((location) => (
            <li
              key={location.id}
              className="bg-[#2a2a2a] shadow rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    {location.name}
                  </h3>
                  <p className="text-gray-400">{location.address}</p>
                  <p className="text-gray-400">{location.phone}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-gray-100">
                    {location.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleLocation(location.id)}
                className="mt-2 text-[#5a5a5a] flex items-center hover:text-gray-300"
              >
                {expandedLocation === location.id ? (
                  <>
                    Hide Details
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    View Details
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
              {expandedLocation === location.id && (
                <LocationDetails location={location} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No locations found for this category.</p>
      )}
    </div>
  );
}
