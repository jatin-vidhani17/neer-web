import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icon images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Create a colored marker icon
const createColoredIcon = (color) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 25;
  canvas.height = 41;

  const img = new Image();
  img.src = markerIcon;

  return new Promise((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const iconUrl = canvas.toDataURL();
      resolve(
        L.icon({
          iconUrl: iconUrl,
          iconRetinaUrl: iconUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: markerShadow,
        })
      );
    };
  });
};

const CoordinateDisplay = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      setCoordinates([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const GeoLocation = () => {
  const [markerIcons, setMarkerIcons] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [coordinates, setCoordinates] = useState(null); // Store clicked coordinates

  // Sample features with positions, names, and types
  const features = [
    { position: [23.0200, 72.5645], name: "Sabarmati River", type: "RIVER", color: "#FF5733" },
    { position: [23.0225, 72.5700], name: "Kankaria Lake", type: "LAKE", color: "#33FF57" },
    { position: [23.0250, 72.5775], name: "Vastrapur Pond", type: "POND", color: "#3357FF" },
    { position: [23.0280, 72.5800], name: "Ahmedabad Canal", type: "CANAL", color: "#DFAB1D" },
    { position: [23.0310, 72.5725], name: "Thaltej Tank", type: "TANK", color: "#FF9F33" },
  ];

  useEffect(() => {
    const loadIcons = async () => {
      const icons = await Promise.all(
        features.map((feature) => createColoredIcon(feature.color))
      );
      setMarkerIcons(icons);
      setFilteredFeatures(features); // Initialize with all features
    };

    loadIcons();
  }, []);

  return (
    <div className="mt-20">
      <main className="flex flex-col items-center py-12">
        <div className="container w-4/5">
          {/* Search section */}
          <div className="head flex flex-row items-end justify-end bg-gray-100 p-2 mb-4">
            <select className="h-8 mx-1" defaultValue="">
              <option value="" disabled>
                Select Field
              </option>
              <option value="">Date</option>
              <option value="">Time</option>
              <option value="">City</option>
              <option value="">Temp.</option>
              <option value="">PH</option>
              <option value="">Depth</option>
              <option value="">O2</option>
              <option value="">Conductivity</option>
              <option value="">Turbidity</option>
              <option value="">Chlorophyll</option>
              <option value="">SPM</option>
              <option value="">Lat.</option>
              <option value="">Long.</option>
              <option value="">Ref. R</option>
              <option value="">Ref. G</option>
              <option value="">Ref. B</option>
            </select>

            <select className="h-8 mx-1" defaultValue="">
              <option value="" disabled>
                Select Operation
              </option>
              <option value="">&lt;</option>
              <option value="">&lt;=</option>
              <option value="">&gt;</option>
              <option value="">&gt;=</option>
              <option value="">=</option>
            </select>

            <input
              type="text"
              placeholder="Enter Value"
              className="h-8 mx-1 px-2"
            />
            <span className="flex flex-col items-end">
              <a href="" className="mb-1 text-blue-500 hover:underline">
                Go to Map
              </a>
              <input
                type="button"
                value="Search"
                className="cursor-pointer h-8 px-4 bg-blue-500 text-white rounded"
              />
            </span>
          </div>

          {/* Map Section */}
          <div className="relative w-full h-[400px]">
            <MapContainer
              center={[23.0225, 72.5714]}
              zoom={12}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <CoordinateDisplay setCoordinates={setCoordinates} />
              {markerIcons.length > 0 &&
                filteredFeatures.map((feature, index) => (
                  <Marker
                    key={index}
                    position={feature.position}
                    icon={markerIcons[index]}
                  >
                    <Tooltip>
                      <div>
                        <strong>{feature.name}</strong>
                        <br />
                        Coordinates: {feature.position[0].toFixed(4)}, {feature.position[1].toFixed(4)}
                        <br />
                        Type: {feature.type}
                      </div>
                    </Tooltip>
                  </Marker>
                ))}
            </MapContainer>

            {/* Legend box at the bottom-left */}
            <div
              className="legend absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md w-44"
              style={{ zIndex: 1000 }} // Ensure it is above the map
            >
              <h4 className="font-semibold">Legend</h4>
              <ul className="text-sm">
                <li>
                  <span className="inline-block w-3 h-3 mr-2 bg-[#FF5733]"></span>
                  River
                </li>
                <li>
                  <span className="inline-block w-3 h-3 mr-2 bg-[#33FF57]"></span>
                  Lake
                </li>
                <li>
                  <span className="inline-block w-3 h-3 mr-2 bg-[#3357FF]"></span>
                  Pond
                </li>
                <li>
                  <span className="inline-block w-3 h-3 mr-2 bg-[#DFAB1D]"></span>
                  Canal
                </li>
                <li>
                  <span className="inline-block w-3 h-3 mr-2 bg-[#FF9F33]"></span>
                  Tank
                </li>
              </ul>
            </div>

            {/* Display Coordinates */}
            {coordinates && (
              <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md w-auto">
                <h4 className="font-semibold">Coordinates</h4>
                <p className="text-sm">
                  Latitude: {coordinates[0].toFixed(4)}
                  <br />
                  Longitude: {coordinates[1].toFixed(4)}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeoLocation;
