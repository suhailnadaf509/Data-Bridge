import DataBridgeMap from "./components/DataBridgeMap";

// Example resources data
const resources = [
  {
    id: "1",
    name: "Local Food Bank",
    type: "foodbank",
    lat: 40.7128,
    lng: -74.006,
    address: "123 Main St",
    description: "Provides free food to those in need",
    services: ["Food Distribution", "SNAP Application Help"],
  },
  // ... more resources
];

// In your component

export default function Page() {
  return (
    <main className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="container mx-auto"></div>
      <DataBridgeMap resources={resources} />;
    </main>
  );
}
