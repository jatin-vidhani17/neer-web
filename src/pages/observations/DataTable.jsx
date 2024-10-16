import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterField, setFilterField] = useState('');
  const [filterOperation, setFilterOperation] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // Fetch data from Firebase
  useEffect(() => {
    const db = getDatabase();
    const observationRef = ref(db, 'observation_data');

    onValue(observationRef, (snapshot) => {
      const fetchedData = snapshot.val() || {};
      const formattedData = Object.keys(fetchedData).map((key) => ({
        id: key,
        ...fetchedData[key],
      }));
      setData(formattedData);
      setFilteredData(formattedData); // Initial display of all data
    });
  }, []);

  // Dynamic filter input type
  const getInputType = () => {
    if (filterField === 'date') return 'date';
    if (filterField === 'Temperature' || filterField === 'pH' || filterField === 'Conductivity' || filterField === 'spm') return 'number';
    return 'text';
  };

  // Handle filter logic
  const handleFilter = () => {
    if (!filterField || !filterOperation || !filterValue) return;

    const filtered = data.filter((entry) => {
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
    setFilteredData(filtered);
  };

  // Reset filter and show all data
  const resetFilter = () => {
    setFilteredData(data);
    setFilterField('');
    setFilterOperation('');
    setFilterValue('');
  };

  return (
    <div className="mt-20">
      <main className="flex flex-col items-center py-12">
        <div className="container w-4/5">
          {/* Search and Filter section */}
          <div className="head flex flex-row items-end justify-end bg-gray-100 p-4 mb-4 space-x-4">
            <select
              className="h-10 px-2 border"
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <option value="" disabled>Select Field</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="latitude">Latitude</option>
              <option value="longitude">Longitude</option>
              <option value="Temperature">Temperature</option>
              <option value="pH">pH</option>
              <option value="Conductivity">Conductivity</option>
              <option value="spm">SPM</option>
              <option value="ref_red">Ref. R</option>
              <option value="ref_green">Ref. G</option>
              <option value="ref_blue">Ref. B</option>
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
              type={getInputType()}
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

          {/* Data Table */}
          <table className="table-auto w-full text-left bg-white shadow-md rounded border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Latitude</th>
                <th className="border px-4 py-2">Longitude</th>
                <th className="border px-4 py-2">Temperature</th>
                <th className="border px-4 py-2">pH</th>
                <th className="border px-4 py-2">Conductivity</th>
                <th className="border px-4 py-2">SPM</th>
                <th className="border px-4 py-2">Ref. R</th>
                <th className="border px-4 py-2">Ref. G</th>
                <th className="border px-4 py-2">Ref. B</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{entry.date || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.time || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.latitude || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.longitude || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.Temperature || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.pH || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.Conductivity || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.spm || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.ref_red || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.ref_green || 'N/A'}</td>
                    <td className="border px-4 py-2">{entry.ref_blue || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DataTable;
