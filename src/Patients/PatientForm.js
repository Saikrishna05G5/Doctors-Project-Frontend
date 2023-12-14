import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    gender: '',
    age: '',
    disease: '',
    doctor: '',
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/doctors')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctor data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new patient object with the form data
    const newPatient = {
      name: formData.name,
      weight: formData.weight,
      gender: formData.gender,
      age: formData.age,
      disease: formData.disease,
      doctor: formData.doctor,
    };

    // Send a POST request to the JSON server to add the new patient
    axios.post('http://localhost:5000/patients', newPatient)
      .then((response) => {
        // Call the onAdd callback to update the patient list in the parent component
        onAdd(response.data);

        // Clear the form fields
        setFormData({
          name: '',
          weight: '',
          gender: '',
          age: '',
          disease: '',
          doctor: '',
        });
      })
      .catch((error) => {
        console.error('Error adding patient data:', error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Enter Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="weight">Enter Weight:</label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender">Enter Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">Enter Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="disease">Enter Disease:</label>
        <input
          type="text"
          id="disease"
          name="disease"
          value={formData.disease}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="doctor">Select Doctor:</label>
        <select
          id="doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default PatientForm;