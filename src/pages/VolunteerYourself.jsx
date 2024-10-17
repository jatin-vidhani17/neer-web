// src/pages/VolunteerYourself.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { database } from '../firebaseconfig';
import { ref, set } from 'firebase/database';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import bcrypt from 'bcryptjs';

const VolunteerYourself = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: '',
    email: '',
    insti: '',
    state: null,
    city: null,
    pass: '',
    pass_conf: '',
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

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

    // Load form data from session storage
    const savedData = sessionStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      sessionStorage.setItem('formData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleStateChange = async (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedOption,
      city: null, // Reset city when state changes
    }));

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

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    if (!namePattern.test(formData.fname)) {
      newErrors.fname = "First name should contain only letters.";
    }
    if (!namePattern.test(formData.lname)) {
      newErrors.lname = "Last name should contain only letters.";
    }
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordPattern.test(formData.pass)) {
      newErrors.pass = "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.";
    }
    if (formData.pass !== formData.pass_conf) {
      newErrors.pass_conf = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.pass, salt);

      const dataToStore = {
        ...formData,
        pass: hashedPassword,
      };
      delete dataToStore.pass_conf;

      const emailKey = formData.email.replace('.', '-');
      const formRef = ref(database, 'users/' + emailKey);
      await set(formRef, dataToStore);

      console.log('Form submitted successfully:', dataToStore);
      sessionStorage.removeItem('formData');
      setFormData({
        fname: '',
        lname: '',
        gender: '',
        email: '',
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

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in with Google:', user);

      const userRef = ref(database, 'users/' + user.email.replace('.', '-'));
      await set(userRef, {
        fname: user.displayName.split(' ')[0],
        lname: user.displayName.split(' ')[1],
        email: user.email,
      });
    } catch (error) {
      console.error('Error during Google sign-in:', error);
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
            error={errors.fname}
          />
          <InputField
            name="lname"
            placeholder="Enter Last Name"
            required
            value={formData.lname}
            onChange={handleChange}
            error={errors.lname}
          />
          <GenderSelection gender={formData.gender} onChange={handleChange} />
          <InputField
            name="email"
            type="email"
            placeholder="Enter Email"
            required
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
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
            isDisabled={!formData.state}
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
            error={errors.pass}
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
            error={errors.pass_conf}
          />
          <input
            type="submit"
            value="Submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
          />
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full bg-red-500 text-white p-3 rounded hover:bg-red-600 transition duration-200 cursor-pointer"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

// Helper component for text input fields
const InputField = ({ name, type = 'text', placeholder, required, value, onChange, error }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none block text-gray-700 text-sm font-bold mb-2`}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
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
