import React,{useState,useEffect} from "react";
import axios from 'axios'; //import axios
import DoctorForm from "./DoctorForm";
import DoctorList from "./DoctorList";


function Doctorr() {
    const [doctors,setDoctors] =useState([]);
    const handleAddDoctor =(newDoctor) => {
        //send a post request to your JSON Server to add a new doctor
        axios.post('http://65.0.21.101:5000/doctors', newDoctor)
        .then((response) => {
            //update the React State with the newly created doctor
            setDoctors([...doctors, response.data]);
            //update localStorage After adding
            const updatedDoctors =[...doctors,response.data];
            localStorage.setItem('doctors',JSON.stringify(updatedDoctors));
        })
        .catch((error) => {
            console.error('Error Adding Data:',error);
        });
    };
    useEffect(() => {
        axios.get('http://65.0.21.101:5000/doctors')
        .then((response) => {
            setDoctors(response.data);
        })
        .catch((error) => {
            console.error('Error Fetching Data:',error);
        });
    },[]);

    const handleDeleteDoctor =(doctorID) => {
        //send a delete request to your JSON server to delere the doctor data
        axios.delete(`http://65.0.21.101:5000/doctors/${doctorID}`)
        .then(() => {
            //Remove the deleted doctor from the react state
            const updatedDoctors =doctors.filter((doctor) => doctor.id !== doctorID);
            setDoctors(updatedDoctors);

            //update local storage after deleting
            localStorage.setItem('doctors',JSON.stringify(updatedDoctors));
    })
        .catch((error) => {
            console.error("error deleting data:",error);
        });
    };

    const handleEditDoctor =(editedDoctor) => {
        //send a PUT request to your JSON Server to update the doctor data
        axios.put(`http://65.0.21.101:5000/doctors/${editedDoctor.id}`,editedDoctor)
        .then(() => {
            //update the React state with the edited doctor data
            const updatedDoctors =doctors.map((doctor) => doctor.id === editedDoctor.id ? editedDoctor : doctor);
            setDoctors(updatedDoctors);

            // Update localStorage after editing
            localStorage.setItem('doctors',JSON.stringify(updatedDoctors));
        })
        .catch((error) => {
            console.error('Error updating Data:',error);
        });
    };

    return(
        <div className="App">
            <h1>Doctor</h1>
            <DoctorForm onAdd={handleAddDoctor}/>
            <DoctorList doctors={doctors} onDelete={handleDeleteDoctor} onEdit={handleEditDoctor} />
        </div>
    );
}
export default Doctorr;
