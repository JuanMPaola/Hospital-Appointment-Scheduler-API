export const doctorUpdateExample = {
  summary: 'Example of Updated DoctorDto',
  value: {
    name: "Dr. John Doe",
    email: "john.doe@newdomain.com", // Updated email
    password: "newsecurepassword", // Updated password
    specialties: [2, 6, 8], // Updated specialties
    week_availability: {
      "2": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], // Updated availability
      "3": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      "4": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      "5": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      "6": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
    }
  },
}
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
export const getUsersResponseExample = [
    {
      "id": "252f6bb0-a8de-4263-a29c-2d5491a0dbcd",
      "name": "Dr. John Doe",
      "email": "john.doe@example.com",
      "password": "securepassword",
      "role": "doctor"
    },
    {
      "id": "827576be-69c4-4a18-bba6-7f8e7bfd3e4b",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "password": "contraseña",
      "role": "patient"
    }
]

export const getUserByEmailResponseExample = {
    "id": "252f6bb0-a8de-4263-a29c-2d5491a0dbcd",
    "name": "Dr. John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "role": "doctor"
}

export const deleteUsersResponseExample = {
    "id": "e643f46b-10b1-49f1-90d2-0dcc5a9973af",
    "name": "Juan Manuel",
    "email": "juanma@example.com",
    "password": "contra",
    "role": "patient"
}

export const updateUsersResponseExample = {
    "id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
    "name": "Jane Smith",
    "password": "newpassword",
    "age": 35,
    "phone": "987-654-3210",
    "email": "jane.smith@example.com",
    "born": "1990-01-01T00:00:00.000Z",
  }