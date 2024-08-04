export const patientExample = {
    summary: 'Example of PatientDto',
    value:
    {
        name: "Jane Smith",
        password: "contraseña",
        age: 34,
        phone: "123-456-7890",
        email: "jane.smith@example.com",
        born: new Date("1990-01-01T00:00:00Z"),
        role: "patient"
    },
};

export const doctorExample = {
    summary: 'Example of DoctorDto',
    value: 
    {
        name: "Dr. John Doe",
        email: "john.doe@example.com",
        password: "securepassword",
        role: "doctor",
        specialties: [1, 5, 7],
        week_availability: {
            "1": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
            "2": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
            "3": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
            "4": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
            "5": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
        }
    },
};

export const doctorExample2 = {
    name: "Dr. Carlos Perez",
    email: "carlitosh@example.com",
    password: "anothersecurepassword",
    role: "doctor",
    specialties: [2, 3],
    availability: {
        "1": [9, 10, 11, 12, 13, 14, 15, 16],
        "2": [9, 10, 11, 12, 13, 14, 15, 16],
        "3": [9, 10, 11, 12, 13, 14, 15, 16],
        "4": [13, 14, 15, 16, 17, 18],
        "5": [13, 14, 15, 16, 17, 18]
    }
};


export const appointmentExample = {
    summary: 'Example of DoctorDto',
    value: 
    {
        doctor_id: "add uuid here",
        patient_id: "add uuid here",
        time_range_id: 1,
        date: new Date("2024-07-22T08:00:00.000Z"),
        status: "pending"
    }
};
export const patientLoginExample = {
    summary: 'Example for a patient login in',
    value: 
    {
        email: "jane.smith@example.com",
        password: "contraseña"
    }
}
export const doctorLoginExample = {
    summary: 'Example for login in',
    value: 
    {
        email: "john.doe@example.com",
        password: "securepassword"
    }
}


/* 
const patientExampleObject2 = {
    name: "Juan Manuel",
    password: "contra",
    age: 23,
    phone: "123-456-7890",
    email: "juanma@example.com",
    born: new Date("2001-01-01T00:00:00Z"),
    role: "patient"
};
const appointmentExampleObject1 = {
    doctor_id: "add uuid here",
    patient_id: "add uuid here",
    time_range_id: 1,
    date: new Date("2024-07-22T08:00:00.000Z"),
    status: "pending"
};
const appointmentExampleObject2 = {
    doctor_id: "add uuid here",
    patient_id: "add uuid here",
    time_range_id: 2,
    date: new Date("2024-08-22T08:00:00.000Z"),
    status: "confirmed"
}; 
*/