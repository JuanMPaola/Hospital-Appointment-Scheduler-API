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

  export const registerDoctorExample = {
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
  export const registerDoctorExample2 = {
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
  export const registerPatientExample = {
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
export const registerPatientExample2 = {
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
  
  export const registeredResponseExamples = {
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