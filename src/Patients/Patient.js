import React, { useState, useEffect } from 'react'; // Import React
import axios from 'axios';
import PatientForm from './PatientForm';
import PatientList from './PatientList';


function Patient() {
  const [Patients, setPatients] = useState([]);

  const handleAddPatient = (newPatient) => {
    // Send a POST request to your JSON server to add a new Patient
    axios.post(' http://65.0.21.101:5000/patients', newPatient)
      .then((response) => {
        // Update the React state with the newly created Patient
        setPatients([...Patients, response.data]);
  
        // Update localStorage after adding
        const updatedPatients = [...Patients, response.data];
        localStorage.setItem('Patients', JSON.stringify(updatedPatients));
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };
  
  useEffect(() => {
    axios.get('http://65.0.21.101:5000/patients')
  .then((response) => {
    setPatients(response.data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

  }, []);

  const handleDeletePatient = (PatientId) => {
    // Send a DELETE request to your JSON server to delete the Patient data
    axios.delete(`http://65.0.21.101:5000/patients/${PatientId}`)
      .then(() => {
        // Remove the deleted Patient from the React state
        const updatedPatients = Patients.filter((Patient) => Patient.id !== PatientId);
        setPatients(updatedPatients);
  
        // Update localStorage after deleting
        localStorage.setItem('Patients', JSON.stringify(updatedPatients));
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };
  
  const handleEditPatient = (editedPatient) => {
    // Send a PUT request to your JSON server to update the Patient data
    axios.put(` http://65.0.21.101:5000/patients/${editedPatient.id}`, editedPatient)
      .then(() => {
        // Update the React state with the edited Patient data
        const updatedPatients = Patients.map((Patient) =>
          Patient.id === editedPatient.id ? editedPatient : Patient
        );
        setPatients(updatedPatients);
  
        // Update localStorage after editing
        localStorage.setItem('Patients', JSON.stringify(updatedPatients));
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  return (
    <div className="App">
      <h1>Patient</h1>
      <PatientForm onAdd={handleAddPatient} />
      <PatientList
        Patients={Patients}
        onDelete={handleDeletePatient}
        onEdit={handleEditPatient}
      />
    </div>
  );
}

export default Patient;