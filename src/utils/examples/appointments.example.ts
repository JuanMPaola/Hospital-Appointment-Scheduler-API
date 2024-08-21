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
    time_range_id: 17,
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

export const updateAppointmentExampleBody =
{
  summary: 'Example of UpdateAppointmentDto',
  value: {
    patient_id: "Patient uuid here",
    doctor_id: "Doctor uuid here",
    time_range_id: 20,
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()
  }
};

export const getAppointmetnsResponseExample = [
  {
    "id": 81,
    "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
    "patient_id": "ae64a156-b0f6-4b99-a87f-eacf4e98edd9",
    "date": "2024-08-22T03:00:00.000Z",
    "day_id": 5,
    "time_range_id": 13,
    "status": "pending"
  },
  {
    "id": 82,
    "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
    "patient_id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
    "date": "2024-08-22T03:00:00.000Z",
    "day_id": 5,
    "time_range_id": 14,
    "status": "pending"
  }
];



export const postNearestAppointmentResponseExample = {
  status: 201,
  description: 'The record has been successfully created.',
  content: {
    'application/json': {
      example: {
        "id": 84,
        "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
        "patient_id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
        "date": "2024-08-22T03:00:00.000Z",
        "day_id": 5,
        "time_range_id": 15,
        "status": "pending"
      }
    }
  },
};

export const getUserAppointmentsResponseExample = [
  {
    "id": 81,
    "date": "2024-08-22T03:00:00.000Z",
    "status": "pending",
    "doctor_name": "Dr. Carlos Perez",
    "doctor_email": "carlitosh@example.com",
    "patient_name": "Juan Manuel",
    "patient_email": "juanma@example.com",
    "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
    "patient_id": "ae64a156-b0f6-4b99-a87f-eacf4e98edd9",
    "day": "Thursday",
    "time_range": "06:00-06:30"
  },
  {
    "id": 84,
    "date": "2024-08-22T03:00:00.000Z",
    "status": "pending",
    "doctor_name": "Dr. Carlos Perez",
    "doctor_email": "carlitosh@example.com",
    "patient_name": "Jane Smith",
    "patient_email": "jane.smith@example.com",
    "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
    "patient_id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
    "day": "Thursday",
    "time_range": "07:00-07:30"
  }
];

export const deleteAppointmentResponseExample = {
  "id": 83,
  "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
  "patient_id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
  "date": "2024-08-22T03:00:00.000Z",
  "day_id": 5,
  "time_range_id": 14,
  "status": "pending"
};
    
  
export const postAppointmentsResponseExample = {
  "id": 85,
  "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
  "patient_id": "ae64a156-b0f6-4b99-a87f-eacf4e98edd9",
  "date": "2024-08-22T03:00:00.000Z",
  "day_id": 5,
  "time_range_id": 15,
  "status": "pending"
};

export const cancelAppointmentResponseExample = {
  "id": 84,
  "doctor_id": "0718c6b8-b8e8-46e5-92f0-102da331e11c",
  "patient_id": "47531d2c-c079-43c1-a6b8-e6142d26dd1b",
  "date": "2024-08-22T03:00:00.000Z",
  "day_id": 5,
  "time_range_id": 15,
  "status": "canceled"
};

export const testingAppointmentExample ={
  doctor_id: "11cf6df3-2d95-4cc5-954a-aa30b2b42bc6",
  patient_id: "167e51b1-57cc-4620-833e-3533d0874679",
  time_range_id: 17,
  date: new Date(new Date().setDate(new Date().getDate() + 1)),
  status: "pending"
};