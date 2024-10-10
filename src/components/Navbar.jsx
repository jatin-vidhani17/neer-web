import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [observationsDropdown, setObservationsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setObservationsDropdown(!observationsDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setObservationsDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex-none">
          <img src="assets/images/logo.png" alt="Logo" className="h-12" />
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-blue-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/citizen-science" className="text-white hover:text-blue-400">
              Citizen Science
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <span
              className="text-white hover:text-blue-400 cursor-pointer"
              onClick={toggleDropdown}
            >
              Observations
            </span>
            {observationsDropdown && (
              <ul className="absolute bg-gray-700 mt-1 rounded-md shadow-lg z-50">
                <li>
                  <Link
                    to="/observations/data-table"
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                    onClick={() => setObservationsDropdown(false)} // Close dropdown on link click
                  >
                    Data Table
                  </Link>
                </li>
                <li>
                  <Link
                    to="/observations/charts"
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                    onClick={() => setObservationsDropdown(false)} // Close dropdown on link click
                  >
                    Charts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/observations/map"
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                    onClick={() => setObservationsDropdown(false)} // Close dropdown on link click
                  >
                    Geo-Location
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/publications" className="text-white hover:text-blue-400">
              Publications
            </Link>
          </li>
          <li>
            <Link to="/app" className="text-white hover:text-blue-400">
              App
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className="text-white hover:text-blue-400">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/volunteer-yourself" className="text-white hover:text-blue-400">
              Volunteer Yourself
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
