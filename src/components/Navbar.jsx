import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [aboutDropdown, setAboutDropdown] = useState(false);
    const [observationsDropdown, setObservationsDropdown] = useState(false);
    const aboutRef = useRef(null);
    const observationsRef = useRef(null);

    return (
        <nav className="bg-gray-900 text-white py-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/" ><img src="../../public/assets/images/logo.png" alt="Logo" className="h-10 mr-3" /></Link>
                    <Link to="/" ><span className="text-2xl font-semibold tracking-wide">Neer</span></Link>
                </div>

                {/* Navbar Links */}
                <ul className="flex space-x-8 text-lg font-medium">
                    <li>
                        <Link to="/" className="hover:text-green-400 transition-colors duration-300">
                            Home
                        </Link>
                    </li>

                    {/* About Dropdown */}
                    <li 
                        className="relative"
                        onMouseEnter={() => setAboutDropdown(true)}
                        onMouseLeave={() => setAboutDropdown(false)}
                        ref={aboutRef}
                    >
                        <span className="hover:text-green-400 cursor-pointer transition-colors duration-300">About</span>
                        {aboutDropdown && (
                            <ul className="absolute left-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md py-2 w-60 space-y-2 z-50">
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-500">
                                    <Link to="about#aboutneer" className="hover:text-green-400">About Neer</Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-500">
                                    <Link to="about#parameters" className="hover:text-green-400">Parameters Used</Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-500">
                                    <Link to="about#appDo" className="hover:text-green-400">What does this App do?</Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-500">
                                    <Link to="about#whoWeAre" className="hover:text-green-400">Who are we?</Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-500">
                                    <Link to="about#howToProceed" className="hover:text-green-400">How to Proceed?</Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-500">
                                    <Link to="about#dataUse" className="hover:text-green-400">Data Usage</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Citizen Science */}
                    <li>
                        <Link to="/citizen-science" className="hover:text-green-400 transition-colors duration-300">
                            Citizen Science
                        </Link>
                    </li>

                    {/* Observations Dropdown */}
                    <li 
                        className="relative"
                        onMouseEnter={() => setObservationsDropdown(true)}
                        onMouseLeave={() => setObservationsDropdown(false)}
                        ref={observationsRef}
                    >
                        <span className="hover:text-green-400 cursor-pointer transition-colors duration-300">Observations</span>
                        {observationsDropdown && (
                            <ul className="absolute left-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md py-2 w-48 space-y-2 z-50">
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-300">
                                    <Link to="/observations/data-table" className="hover:text-green-400">Data Table</Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-300">
                                    <Link to="/observations/charts" className="hover:text-green-400">Charts</Link>
                                </li>
                                <li className="hover:bg-gray-700 px-4 py-2 transition-colors duration-300">
                                    <Link to="/observations/map" className="hover:text-green-400">Geo-Location</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/publications" className="hover:text-green-400 transition-colors duration-300">
                            Publications
                        </Link>
                    </li>

                    <li>
                        <Link to="/app" className="hover:text-green-400 transition-colors duration-300">
                            App
                        </Link>
                    </li>

                    <li>
                        <Link to="/contact-us" className="hover:text-green-400 transition-colors duration-300">
                            Contact Us
                        </Link>
                    </li>

                    <li>
                        <Link to="/volunteer-yourself" className="hover:text-green-400 transition-colors duration-300">
                            Volunteer Yourself
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;