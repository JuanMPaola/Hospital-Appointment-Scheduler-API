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
];

export const swaggerFindAllPatientsResponseExample = {
  description:'',
  example: findaAllPatientsResponseExample
};

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
  };

  export const swaggerFindOnePatientResponseExample = {
    description:'',
    example: findOnePatientResponseExample
  };