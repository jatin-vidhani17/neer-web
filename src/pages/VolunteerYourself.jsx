// src/pages/VolunteerYourself.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { database } from '../firebaseconfig'; // Import the database
import { ref, set } from 'firebase/database'; // Import functions to write to the database

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

  // Fetch states from the API
  useEffect(() => {
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
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedOption.value}`);
        const cityOptions = response.data.districts.map((district) => ({
          value: district.district_id,
          label: district.district_name,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace '.' with '-' in the email to create a valid Firebase path
      const emailKey = formData.email.replace('.', '-'); 

      // Write form data to Firebase Realtime Database
      const formRef = ref(database, 'users/' + emailKey); // Use email as a unique key
      await set(formRef, formData);

      console.log('Form submitted successfully:', formData);
      // Optionally, reset form data
      setFormData({
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
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="h-fit pt-20 flex items-center justify-center bg-gray-800 mt-18">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">New Registration</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <InputField
            name="fname"
            placeholder="Enter First Name"
            required
            value={formData.fname}
            onChange={handleChange}
          />
          <InputField
            name="lname"
            placeholder="Enter Last Name"
            required
            value={formData.lname}
            onChange={handleChange}
          />
          <GenderSelection gender={formData.gender} onChange={handleChange} />
          <InputField
            name="email"
            type="email"
            placeholder="Enter Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            name="phone"
            type="tel"
            placeholder="Enter Mobile No."
            pattern="[0-9]{10}"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            name="insti"
            placeholder="Enter Institute Name"
            required
            value={formData.insti}
            onChange={handleChange}
          />
          <SelectField
            name="state"
            options={states}
            onChange={handleStateChange}
            placeholder="Select State"
          />
          <SelectField
            name="city"
            options={cities}
            onChange={handleCityChange}
            placeholder="Select City"
            isDisabled={!formData.state} // Disable city dropdown until a state is selected
          />
          <InputField
            name="pass"
            type="password"
            placeholder="Enter Password"
            required
            minLength="8"
            maxLength="16"
            value={formData.pass}
            onChange={handleChange}
          />
          <InputField
            name="pass_conf"
            type="password"
            placeholder="Confirm Password"
            required
            minLength="8"
            maxLength="16"
            value={formData.pass_conf}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

// Helper component for text input fields
const InputField = ({ name, type = 'text', placeholder, required, value, onChange, pattern, minLength, maxLength }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      pattern={pattern}
      minLength={minLength}
      maxLength={maxLength}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none block text-gray-700 text-sm font-bold mb-2"
    />
  </div>
);

// Helper component for gender selection
const GenderSelection = ({ gender, onChange }) => (
  <div className="mb-4">
    <span className="block text-gray-700 mb-2">Gender:</span>
    <div className="flex items-center">
      <label className="mr-4">
        <input
          type="radio"
          name="gender"
          value="m"
          required
          checked={gender === 'm'}
          onChange={onChange}
          className="mr-1"
        /> Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="f"
          required
          checked={gender === 'f'}
          onChange={onChange}
          className="mr-1"
        /> Female
      </label>
    </div>
  </div>
);

// Helper component for select input fields
const SelectField = ({ name, options, onChange, placeholder, isDisabled }) => (
  <div className="mb-4">
    <Select
      name={name}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
      className="block text-gray-700 text-sm font-bold mb-2"
      classNamePrefix="select"
    />
  </div>
);

export default VolunteerYourself;
