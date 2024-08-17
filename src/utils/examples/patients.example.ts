export const findaAllPatientsResponseExample = [
    {
        "id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
        "email": "jane.smith@example.com",
        "name": "Jane Smith",
        "phone": "987-654-3210",
        "age": 35,
        "born": "1990-01-01T02:00:00.000Z"
    },
    {
        "id": "e643f46b-10b1-49f1-90d2-0dcc5a9973af",
        "email": "juanma@example.com",
        "name": "Juan Manuel",
        "phone": "123-456-7890",
        "age": 23,
        "born": "2001-01-01T03:00:00.000Z"
    }
]

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
export const patientExample2 = {
    summary: 'Example of PatientDto 2',
    value:
    {
        name: "Juan Manuel",
        password: "contra",
        age: 23,
        phone: "123-456-7890",
        email: "juanma@example.com",
        born: new Date("2001-01-01T00:00:00Z"),
        role: "patient"
    }
};
export const patientUpdateExample = {
    summary: 'Example of Updated PatientDto',
    value: {
        name: "Jane Smith",
        password: "newpassword", // Updated password
        age: 35, // Updated age
        phone: "987-654-3210", // Updated phone number
        email: "jane.smith@example.com", // Email remains the same
        born: new Date("1990-01-01T00:00:00Z"), // Birthdate remains the same
    },
}

export const findOnePatientResponseExample = {
    "id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
    "email": "jane.smith@example.com",
    "name": "Jane Smith",
    "phone": "987-654-3210",
    "age": 35,
    "born": "1990-01-01T02:00:00.000Z",
    "appointments": [
      {
        "date": "2024-08-19",
        "time_range_id": 9,
        "doctor_id": "c642c495-252f-4288-a363-37cd1f4083ac",
        "status": "pending"
      },
      {
        "date": "2024-08-19",
        "time_range_id": 10,
        "doctor_id": "c642c495-252f-4288-a363-37cd1f4083ac",
        "status": "pending"
      }
    ]
  }