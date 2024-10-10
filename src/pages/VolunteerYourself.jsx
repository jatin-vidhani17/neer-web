import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const VolunteerYourself = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: '',
    email: '',
    phone: '',
    insti: '',
    state: null,
    city: null,
    pass: '',
    pass_conf: '',
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch states from API
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
        const stateOptions = response.data.states.map((state) => ({
          value: state.state_id,
          label: state.state_name,
        }));
        setStates(stateOptions);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStateChange = async (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedOption,
      city: null, // Reset city when state changes
    }));

    // Fetch cities based on the selected state
    if (selectedOption) {
      try {
        // Example endpoint to get cities based on state ID. Replace with actual API.
        const response = await axios.get(`https://example.com/api/cities/${selectedOption.value}`);
        const cityOptions = response.data.cities.map((city) => ({
          value: city.city_id,
          label: city.city_name,
        }));
        setCities(cityOptions);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    } else {
      setCities([]); // Clear cities if no state is selected
    }
  };

  const handleCityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      city: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center mb-6">New Registration</h3>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fname"
              placeholder="Enter First Name"
              required
              value={formData.fname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out hover:shadow-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lname"
              placeholder="Enter Last Name"
              required
              value={formData.lname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out hover:shadow-lg"
            />
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 mb-2">Gender:</span>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="m"
                  required
                  checked={formData.gender === 'm'}
                  onChange={handleChange}
                  className="mr-1"
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="f"
                  required
                  checked={formData.gender === 'f'}
                  onChange={handleChange}
                  className="mr-1"
                /> Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out hover:shadow-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="Enter Mobile No."
              pattern="[0-9]{10}"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out hover:shadow-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="insti"
              placeholder="Enter Institute Name"
              required
              value={formData.insti}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out hover:shadow-lg"
            />
          </div>
          <div className="mb-4">
            <Select
              name="state"
              options={states}
              onChange={handleStateChange}
              placeholder="Select State"
              className="basic-single mb-4"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-4">
            <Select
              name="city"
              options={cities}
              onChange={handleCityChange}
              placeholder="Select City"
              isDisabled={!formData.state} // Disable city dropdown until a state is selected
              className="basic-single"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="pass"
              placeholder="Enter Password"
              required
              minLength="8"
              maxLength="16"
              value={formData.pass}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out hover:shadow-lg"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="pass_conf"
              placeholder="Confirm Password"
              required
              minLength="8"
              maxLength="16"
              value={formData.pass_conf}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out hover:shadow-lg"
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default VolunteerYourself;
