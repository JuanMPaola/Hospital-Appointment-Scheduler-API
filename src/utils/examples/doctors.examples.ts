export const findAllDoctorsResponseExample = [
    {
      "id": "323d878b-8166-48dd-8fc7-46384163471f",
      "name": "Dr. John Doe",
      "email": "john.doe@example.com",
      "specialties": [
        "Anesthesiology",
        "Family Medicine",
        "Medical Genetics"
      ]
    },
    {
      "id": "c642c495-252f-4288-a363-37cd1f4083ac",
      "name": "Dr. Carlos Perez",
      "email": "carlitosh@example.com",
      "specialties": [
        "Anesthesiology",
        "Cardiology",
        "Dermatology"
      ]
    }
  ]

  export const swaggerFindAllDoctorsResponseExample = {
    description:'',
    example: findAllDoctorsResponseExample
  }

  export const findOneDoctorResponseExample = {
    "name": "Dr. John Doe",
    "email": "john.doe@example.com",
    "specialties": [1, 5, 7],
    "weekly_availability": {
      "2": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "3": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "4": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "5": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      "6": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
    }
  }

  export const swaggerFindOneDoctorResponseExample = {
    description:'',
    example: findOneDoctorResponseExample
  }

  export const findBySpecialtyResponseExample = [
    {
      "id": "323d878b-8166-48dd-8fc7-46384163471f",
      "name": "Dr. John Doe",
      "email": "john.doe@example.com"
    },
    {
      "id": "c642c495-252f-4288-a363-37cd1f4083ac",
      "name": "Dr. Carlos Perez",
      "email": "carlitosh@example.com"
    }
  ]

  export const swaggerFindBySpecialtyResponseExample = {
    description:'',
    example: findBySpecialtyResponseExample
  }

  export const findAvailabilityResponseExample = [
    {
      "weekly_availability": {
        "2": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        "3": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        "4": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        "5": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        "6": [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
      },
      "appointments": []
    }
  ]

  export const swaggerFindAvailabilityResponseExample = {
    description:'',
    example: findAvailabilityResponseExample
  }
  