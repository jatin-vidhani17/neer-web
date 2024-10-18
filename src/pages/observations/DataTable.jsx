import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterField, setFilterField] = useState('');
  const [filterOperation, setFilterOperation] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const observationRef = ref(db, 'observation_data');

    onValue(observationRef, (snapshot) => {
      const fetchedData = snapshot.val() || {};
      const formattedData = Object.keys(fetchedData).map((key) => ({
        id: key,
        ...fetchedData[key],
      }));

      // Parse date properly and sort by date in descending order
      const sortedData = formattedData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Newest first
      });

      setData(sortedData);
      setFilteredData(sortedData); // Initially display all data
    });
  }, []);

  const getInputType = () => {
    if (filterField === 'date') return 'date';
    if (filterField === 'time') return 'time'; // Time input type for time field
    if (['Temperature', 'pH', 'Conductivity', 'spm'].includes(filterField)) return 'number';
    return 'text';
  };

  const isValidTime = (time) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d(\.\d{1,3})?)?$/;
    return timeRegex.test(time);
  };

  const handleFilter = () => {
    if (!filterField || !filterOperation || !filterValue) return;

    const filtered = data.filter((entry) => {
      const entryValue = entry[filterField] || '';

      // Handle date filtering separately
      if (filterField === 'date') {
        const filterDate = new Date(filterValue);
        const entryDate = new Date(entryValue);
        switch (filterOperation) {
          case '=':
            return entryDate.toDateString() === filterDate.toDateString();
          case '>':
            return entryDate > filterDate;
          case '>=':
            return entryDate >= filterDate;
          case '<':
            return entryDate < filterDate;
          case '<=':
            return entryDate <= filterDate;
          default:
            return true;
        }
      }

      // Handle time filtering separately
      if (filterField === 'time') {
        if (!isValidTime(filterValue)) {
          alert('Please enter a valid time in HH:mm format.');
          return false;
        }
        return filterOperation === '=' ? entryValue === filterValue : false;
      }

      // For numeric comparisons
      const numericValue = parseFloat(entryValue);
      const filterNumericValue = parseFloat(filterValue);

      switch (filterOperation) {
        case '=':
          return numericValue === filterNumericValue;
        case '>':
          return numericValue > filterNumericValue;
        case '>=':
          return numericValue >= filterNumericValue;
        case '<':
          return numericValue < filterNumericValue;
        case '<=':
          return numericValue <= filterNumericValue;
        default:
          return true;
      }
    });

    const sortedFilteredData = filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Newest first
    });

    setFilteredData(sortedFilteredData);
  };

  const resetFilter = () => {
    setFilteredData(data);
    setFilterField('');
    setFilterOperation('');
    setFilterValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilter();
    }
  };

  return (
    <div className="mt-20">
      <main className="flex flex-col items-center py-12">
        <div className="container w-4/5">
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
              onKeyPress={handleKeyPress}
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
                  <td colSpan="11" className="text-center py-4">No data available</td>
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
