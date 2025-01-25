"use client";
import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.7128, // Default to NYC coordinates
  lng: -74.006,
};

const DataBridgeMap = ({
  resources,
}: {
  resources: Array<{
    id: string;
    lat: number;
    lng: number;
    type: string;
    name: string;
    address: string;
    description: string;
    services: string[];
  }>;
}) => {
  const [selectedResource, setSelectedResource] = useState<{
    id: string;
    lat: number;
    lng: number;
    type: string;
    name: string;
    address: string;
    description: string;
    services: string[];
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Replace with your actual Google Maps API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_APIKEY || "",
    libraries: ["places"],
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    // Get user's location if permitted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          map.panTo(userPos);
        },
        () => {
          console.log("Error getting location");
        }
      );
    }
  }, []);

  // Handle marker clicks
  const handleMarkerClick = (resource: {
    id: string;
    lat: number;
    lng: number;
    type: string;
    name: string;
    address: string;
    description: string;
    services: string[];
  }) => {
    setSelectedResource(resource);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={userLocation || center}
      onLoad={onMapLoad}
    >
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            url: "/public/userlocmarker.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      )}

      {/* Resource markers */}
      {resources?.map(
        (resource: {
          id: string;
          lat: number;
          lng: number;
          type: string;
          name: string;
          address: string;
          description: string;
          services: string[];
        }) => (
          <Marker
            key={resource.id}
            position={{ lat: resource.lat, lng: resource.lng }}
            onClick={() => handleMarkerClick(resource)}
            icon={{
              url: `/markers/${resource.type}.png`,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        )
      )}

      {/* Info window for selected resource */}
      {selectedResource && (
        <InfoWindow
          position={{ lat: selectedResource.lat, lng: selectedResource.lng }}
          onCloseClick={() => setSelectedResource(null)}
        >
          <div>
            <h3>{selectedResource.name}</h3>
            <p>{selectedResource.address}</p>
            <p>{selectedResource.description}</p>
            <p>Services: {selectedResource.services.join(", ")}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedResource.lat},${selectedResource.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default DataBridgeMap;
