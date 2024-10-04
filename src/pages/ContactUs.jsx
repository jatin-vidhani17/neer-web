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
    <div className="contact-us flex">
      <div className="block w-[50%]">
        <h1 className='text-6xl'>Contact Us</h1>
        <p>Let us know more about you!</p>
        <form>
          <div>
            <input type="text" placeholder="First Name" className="border-2 border-rose-500" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div>
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone" />
          </div>
          <textarea placeholder="Message..." ></textarea>
          <button type="submit">Submit</button>
        </form>

        <h2 className='my-2 font-bold text-xl'>Contact Information</h2>
        <div className='flex'>
        <p>
          <strong>Dr. Jyoti Pareek</strong><br />
          (+91) 9825 599 289<br />
          <a href= "mailto:drjyotipareek@yahoo.com">drjyotipareek@yahoo.com</a>
        </p>
        <p className="ml-6">
          <strong>Dr. Suchit Purohit</strong><br />
          (+91) 9913 419 959<br />
          suchitpurohit@gmail.com
        </p>
        </div>
        
      </div>

      <div className='w-[50%]'>
        <h2>Location</h2>
        <MapContainer center={[23.0225, 72.5714]} zoom={13} className="h-[20rem] w-[100%] ">
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
        <div>
          <p>
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
