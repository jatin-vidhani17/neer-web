import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing the marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
});

const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* Left Section - Contact Form */}
      <div className="block w-full md:w-1/2 p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">Let us know more about you!</p>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Phone"
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-green-500"
            />
          </div>
          <textarea
            placeholder="Message..."
            className="border-2 border-gray-300 rounded-lg p-2 w-full h-32 focus:outline-none focus:border-green-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>

        <h2 className="my-6 font-bold text-xl text-gray-800">Contact Information</h2>
        <div className="flex flex-col space-y-2">
          <p>
            <strong>Dr. Jyoti Pareek</strong><br />
            (+91) 9825 599 289<br />
            <a href="mailto:drjyotipareek@yahoo.com" className="text-blue-500 hover:underline">drjyotipareek@yahoo.com</a>
          </p>
          <p>
            <strong>Dr. Suchit Purohit</strong><br />
            (+91) 9913 419 959<br />
            <a href="mailto:suchitpurohit@gmail.com" className="text-blue-500 hover:underline">suchitpurohit@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Right Section - Map and Location Info */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
        <MapContainer center={[23.0225, 72.5714]} zoom={13} className="h-80 w-full rounded-lg shadow-md z-[10]">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[23.035859085346562, 72.54560667376255]}>
            <Popup>
              Gujarat University
            </Popup>
          </Marker>
        </MapContainer>
        <div className="mt-4">
          <p className="text-gray-700">
            Department Of Computer Science,<br />
            Rollwala Computer Center,<br />
            Gujarat University,<br />
            Navrangpura, Ahmedabad<br />
            Gujarat-380 009
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
