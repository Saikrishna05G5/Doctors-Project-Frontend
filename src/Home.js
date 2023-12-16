import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Patient from './Patients/Patient';

function Home() {
    const [doctors,setDoctors]=useState([]);
    const [selectedDoctor,setSelectedDoctor]=useState('');
    const [filteredPatients,setFilteredPatients]=useState([]);
    const [doctorNotFOund,setDoctorNotFound]=useState(false);

useEffect(()=>{
    axios.get('http://65.0.21.101:5000/doctors').then((response)=>{
        setDoctors(response.data);
    })
    .catch((error) => {
        console.error('Error fetching Doctor Data :',error);
    });

    axios.get('http://65.0.21.101:5000/patients').then((response)=>{
        setFilteredPatients(response.data);
    })
    .catch((error) => {
        console.error('Error fetching Patient Data :',error);
    });
},[]);

const handleDoctorSelect = (e) =>{
    const selectedDoctor = e.target.value;
    setSelectedDoctor(selectedDoctor);
    const filteredPatientsForDoctor = filteredPatients.filter((patient) => patient.doctor === selectedDoctor);

    if(filteredPatientsForDoctor.length === 0) {
        //No patients found for the selected doctor
        setDoctorNotFound(true);
    } else {
        setDoctorNotFound(false);
    } 
    setFilteredPatients(filteredPatientsForDoctor);
};
return(
    <div className="App">
        <h1>Home</h1>
        <div>
            <label htmlFor="doctorDropdown">Select a Doctor:</label>
            <select id="doctorDropdown" onChange={handleDoctorSelect}>
                <option value="">All Doctors</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                ))}
            </select>
        </div>
        {doctorNotFOund ? (
            <p>No Patients Found for the selected doctor</p>
        ) : (
            <div>
               <h2>Patient List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Disease</th>
                            <th>Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patients) => (
                            <tr key={patients.id}>
                                <td>{patients.name}</td>
                                <td>{patients.Weight}</td>
                                <td>{patients.age}</td>
                                <td>{patients.gender}</td>
                                <td>{patients.disease}</td>
                                <td>{patients.doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
    </div>
)}
</div>
);
}
export default Home;