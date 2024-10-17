import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { database } from '../../firebaseconfig';
import { ref, onValue } from "firebase/database";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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
  const [coordinates, setCoordinates] = useState(null);
  
  // Filter states
  const [filterField, setFilterField] = useState('');
  const [filterOperation, setFilterOperation] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // Color mapping according to the legend
  const colorMapping = {
    River: "#FF5733",
    Lake: "#33FF57",
    Pond: "#3357FF",
    Canal: "#DFAB1D",
    Tank: "#FF9F33",
  };

  // Fetch features from Firebase
  useEffect(() => {
    const db = database;
    const featuresRef = ref(db, 'observation_data');

    onValue(featuresRef, (snapshot) => {
      const featuresData = snapshot.val();
      if (featuresData) {
        const featuresArray = Object.keys(featuresData).map((key) => ({
          position: [featuresData[key].latitude, featuresData[key].longitude],
          name: featuresData[key].name,
          type: featuresData[key].type,
          color: colorMapping[featuresData[key].type] || "#000000",
        }));
        setFilteredFeatures(featuresArray);
      }
    });
  }, []);

  // Dynamic filter logic
  const handleFilter = () => {
    if (!filterField || !filterOperation || !filterValue) return;

    const filtered = filteredFeatures.filter((entry) => {
      const entryValue = entry[filterField] || '';
      switch (filterOperation) {
        case '=':
          return entryValue == filterValue;
        case '>':
          return entryValue > filterValue;
        case '>=':
          return entryValue >= filterValue;
        case '<':
          return entryValue < filterValue;
        case '<=':
          return entryValue <= filterValue;
        default:
          return true;
      }
    });
    setFilteredFeatures(filtered);
  };

  // Reset filter and show all data
  const resetFilter = () => {
    setFilteredFeatures(filteredFeatures);
    setFilterField('');
    setFilterOperation('');
    setFilterValue('');
  };

  useEffect(() => {
    const loadIcons = async () => {
      const icons = await Promise.all(
        filteredFeatures.map((feature) => createColoredIcon(feature.color))
      );
      setMarkerIcons(icons);
    };

    if (filteredFeatures.length > 0) {
      loadIcons();
    }
  }, [filteredFeatures]);

  return (
    <div className="mt-20">
      <main className="flex flex-col items-center py-12">
        <div className="container w-4/5">
          {/* Search section */}
          <div className="head flex flex-row items-end justify-end bg-gray-100 p-4 mb-4 space-x-4">
            <select
              className="h-10 px-2 border"
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <option value="" disabled>Select Field</option>
              <option value="name">Name</option>
              <option value="type">Type</option>
              <option value="latitude">Latitude</option>
              <option value="longitude">Longitude</option>
            </select>

            <select
              className="h-10 px-2 border"
              value={filterOperation}
              onChange={(e) => setFilterOperation(e.target.value)}
            >
              <option value="" disabled>Select Operation</option>
              <option value="=">=</option>
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
              <option value="<">&lt;</option>
              <option value="<=">&lt;=</option>
            </select>

            <input
              type="text"
              placeholder={`Enter ${filterField || 'value'}`}
              className="h-10 px-2 border"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />

            <button
              className="h-10 px-4 bg-blue-500 text-white rounded"
              onClick={handleFilter}
            >
              Search
            </button>

            <button
              className="h-10 px-4 bg-gray-400 text-white rounded"
              onClick={resetFilter}
            >
              Reset
            </button>
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
              style={{ zIndex: 1000 }}
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
                <h4 className="font-semibold">Selected Coordinates</h4>
                <p>Latitude: {coordinates[0].toFixed(4)}</p>
                <p>Longitude: {coordinates[1].toFixed(4)}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeoLocation;
