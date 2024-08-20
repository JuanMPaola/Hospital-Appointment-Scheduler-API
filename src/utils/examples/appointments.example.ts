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
  
  export const updateAppointmentExampleBody = 
  {
    summary: 'Example of UpdateAppointmentDto',
    value: {
      patient_id: "Patient uuid here",
      doctor_id: "Doctor uuid here",
      time_range_id: 20,
      date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()
    }
  }