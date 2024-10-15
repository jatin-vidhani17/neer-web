import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icon images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const createColoredIcon = (color) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 25;
  canvas.height = 41;

  const img = new Image();
  img.src = markerIcon;

  return new Promise((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const iconUrl = canvas.toDataURL();
      resolve(L.icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow,
      }));
    };
  });
};

const GeoLocation = () => {
  const [markerIcons, setMarkerIcons] = useState([]);

  const features = [
    { position: [23.0200, 72.5645], type: "Near Sabarmati Riverfront", color: "#FF5733" }, // Decent Red
    { position: [23.0225, 72.5700], type: "Near Gandhi Ashram", color: "#33FF57" }, // Decent Green
    { position: [23.0250, 72.5775], type: "Near Sardar Bridge", color: "#3357FF" }, // Decent Blue
    { position: [23.0280, 72.5800], type: "Near Ellis Bridge", color: "#DFAB1D" }, // Decent Pink
    { position: [23.0310, 72.5725], type: "Near Nehru Bridge", color: "#FF9F33" }, // Decent Orange
    { position: [23.0340, 72.5665], type: "Near Dandi Bridge", color: "#33FFF0" }, // Decent Cyan
    { position: [23.0360, 72.5750], type: "Near Sardar Patel Bridge", color: "#FFA500" }, // Decent Dark Orange
    { position: [23.0390, 72.5780], type: "Near Kankaria Lake", color: "#800080" }, // Decent Purple
    { position: [23.0415, 72.5730], type: "Near Usmanpura", color: "#A52A2A" }, // Decent Brown
    { position: [23.0450, 72.5700], type: "Near Law Garden", color: "#008000" }, // Decent Dark Green
  ];

  useEffect(() => {
    const loadIcons = async () => {
      const icons = await Promise.all(features.map(feature => createColoredIcon(feature.color)));
      setMarkerIcons(icons);
    };

    loadIcons();
  }, []);

  return (
    <div className="mt-20">
      <header>
        {/* Include your header component here */}
      </header>
      <main className="flex flex-col items-center py-12">
        <div className="container w-4/5">
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
              <a href="" className="mb-1 text-blue-500 hover:underline">Go to Map</a>
              <input
                type="button"
                value="Search"
                className="cursor-pointer h-8 px-4 bg-blue-500 text-white rounded"
              />
            </span>
          </div>
          <MapContainer center={[23.0225, 72.5714]} zoom={12} className="h-[400px] w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markerIcons.map((icon, index) => (
              <Marker 
                key={index} 
                position={features[index].position} 
                icon={icon} // Use the colored icon
              >
                <Tooltip>{features[index].type}</Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  );
};

export default GeoLocation;
