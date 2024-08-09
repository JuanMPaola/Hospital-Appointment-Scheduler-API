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
      "2": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "3": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "4": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "5": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "6": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
    }
  },
};
export const doctorExample2 = {
  summary: 'Example of DoctorDto 2',
  value:
  {
    name: "Dr. Carlos Perez",
    email: "carlitosh@example.com",
    password: "anothersecurepassword",
    role: "doctor",
    specialties: [1, 2, 3],
    week_availability: {
      "2": [9, 10, 11, 12, 13, 14, 15, 16],
      "3": [9, 10, 11, 12, 13, 14, 15, 16],
      "4": [9, 10, 11, 12, 13, 14, 15, 16],
      "5": [13, 14, 15, 16, 17, 18],
      "6": [13, 14, 15, 16, 17, 18]
    }
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

export const registeredExamples = {
  status: 201,
  description: 'The record has been successfully created.',
  content: {
    'application/json': {
      examples: {
        example1: {
          summary: 'Patient example',
          value: {
            id: "deec3d0d-c07d-4e5c-a327-ed8f02124618",
            name: "Jane Smith",
            password: "contraseña",
            age: 34,
            phone: "123-456-7890",
            email: "janee.smith@example.com",
            born: "1990-01-01T00:00:00.000Z",
            role: "patient"
          }
        },
        example2: {
          summary: 'Doctor example',
          value: {
            id: "11cf6df3-2d95-4cc5-954a-aa30b2b42bc6",
            name: "Dr. John Doe",
            email: "john.doe@example.com",
            password: "securepassword",
            role: "doctor",
            specialties: [1, 5, 7],
            week_availability: {
              2: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
              3: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
              4: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
              5: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
              6: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
            }
          }
        },
      }
    }
  }
}

export const loginResponseExample = {
  status: 200,
  description: 'Successful login with access token',
  content: {
    'application/json': {
      example: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbmUuc21pdGhAZXhhbXBsZS5jb20iLCJzdWIiOiIxNjdlNTFiMS01N2NjLTQ2MjAtODMzZS0zNTMzZDA4NzQ2NzkiLCJyb2xlIjoidXNlciJ9.RPjYfQIFRZhPMDsLws3qa5cmHTe0EM8df5K1ui1Z_0w"
      }

    }
  }
};

export const postAppointmentResponseExample = {
  status: 201,
  description: 'Appointment successfully created',
  content: {
    'application/json': {
      example: {
        id: 78,
        doctor_id: "11cf6df3-2d95-4cc5-954a-aa30b2b42bc6",
        patient_id: "167e51b1-57cc-4620-833e-3533d0874679",
        date: "2024-08-12T03:00:00.000Z",
        day_id: 2,
        time_range_id: 1,
        status: "pending"
      }
    }
  }
};

export const updateAppointmentResponseExample =
{
  description: 'Appointment successfully updated',
  schema: {
    example: {
      id: 68,
      doctor_id: "11cf6df3-2d95-4cc5-954a-aa30b2b42bc6",
      patient_id: "167e51b1-57cc-4620-833e-3533d0874679",
      date: "2024-07-22T03:00:00.000Z",
      day_id: 4,
      time_range_id: 17,
      status: "pending",
    },
  },
};


export const appointmentExample = {
  summary: 'Example of DoctorDto',
  value:
  {
    doctor_id: "Doctor uuid here",
    patient_id: "Patient uuid here",
    time_range_id: 1,
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    status: "pending"
  }
};
export const updateAppointmentExample =
{
  description: '',
  examples: {
    Example: {
      summary: 'Example of UpdateAppointmentDto',
      value: {
        patient_id: "Patient uuid here",
        doctor_id: "Doctor uuid here",
        time_range_id: 20,
        date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      }
    }
  }
};



/* 
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