import React from "react";
import { useState } from "react";


const DoctorList = ({doctors , onDelete , onEdit}) => {
    const [editableData, setEditableData] = useState(null);
    const handleEditClick = (doctor) => {
        setEditableData({ ...doctor});
    };
    const handleSaveClick = () => {
        if(editableData) {
            onEdit(editableData);
            setEditableData(null);
        }
    };

    const handleDeleteClick = (doctorId) => {
        //call the on delete function to delete the entire row 
        onDelete(doctorId);
    };

    const handleCellChange =(e,key) => {
        if(editableData) {
            setEditableData({ ...editableData,[key]: e.target.value});
        }
    };
    return(
        <div>
            <h2>Doctor List</h2>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>specialization</th>
                    <th>Actions</th>
                    </tr>
                </thead>
         
            <tbody>
                {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                        <td onClick={() => handleEditClick(doctor)}>
                        {editableData && editableData.id === doctor.id ? (
                            <input type="text" value={editableData.name} onChange={(e) => handleCellChange(e,'name')}/>
                        ) : (
                            doctor.name
                        )}
                        </td>
                        <td onClick={() => handleEditClick(doctor)}>
                        {editableData && editableData.id === doctor.id ? (
                            <input type="text" value={editableData.salary} onChange={(e) => handleCellChange(e,'salary')}/>
                        ) : (
                            doctor.salary
                        )}
                        </td>
                        <td onClick={() => handleEditClick(doctor)}>
                        {editableData && editableData.id === doctor.id ? (
                            <input type="number" value={editableData.age} onChange={(e) => handleCellChange(e,'age')}/>
                        ) : (
                            doctor.age
                        )}
                        </td>
                        <td onClick={() => handleEditClick(doctor)}>
                        {editableData && editableData.id === doctor.id ? (
                            <input type="text" value={editableData.gender} onChange={(e) => handleCellChange(e,'gender')}/>
                        ) : (
                            doctor.gender
                        )}
                        </td>
                        <td onClick={() => handleEditClick(doctor)}>
                        {editableData && editableData.id === doctor.id ? (
                            <input type="text" value={editableData.specialization} onChange={(e) => handleCellChange(e,'specialization')}/>
                        ) : (
                            doctor.specialization
                        )}
                        </td>
                        <td>
                        {editableData && editableData.id === doctor.id ? (
                            <button onClick={handleSaveClick}>Save</button>
                        ) : (
                            <button onClick={() => handleEditClick(doctor)}>Edit</button>
                        )}
                        <button onClick={() => handleDeleteClick(doctor.id)}>Delete</button>
                        </td>
                        </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default DoctorList;