import React from "react";
import { Link } from "react-router-dom";

const Observations = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Observations</h2>
      <ul className="mt-4 space-y-2">
        <li><Link to="/observations/data-table" className="text-blue-600">Data Table</Link></li>
        <li><Link to="/observations/charts" className="text-blue-600">Charts</Link></li>
        <li><Link to="/observations/geo-location" className="text-blue-600">Geo-Location</Link></li>
      </ul>
    </div>
  );
};

export default Observations;
