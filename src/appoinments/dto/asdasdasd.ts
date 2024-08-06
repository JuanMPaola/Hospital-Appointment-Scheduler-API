
const docotrs = [
  {
    "id": "01a6c06f-ea0c-4094-a1f3-7cc7ac3aacdd",
    "name": "Dr. John Doe",
    "email": "john.doe@example.com",
    "weekly_availability": {
      "1": [
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34
      ],
      "2": [
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34
      ],
      "3": [
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34
      ],
      "4": [
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34
      ],
      "5": [
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34
      ]
    },
    "appointments": [  ]
  },
  {
    "id": "11670ed1-779c-4487-9825-d25324324d46",
    "name": "Dr. Carlos Perez",
    "email": "carlitosh@example.com",
    "weekly_availability": {
      "1": [
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
      ],
      "2": [
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
      ],
      "3": [
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
      ],
      "4": [
        13,
        14,
        15,
        16,
        17,
        18
      ],
      "5": [
        13,
        14,
        15,
        16,
        17,
        18
      ]
    },
    "appointments": []
  }
]

const patient = {
  "id": "39b4b978-599a-4754-a4d8-2ce53f2d614d",
  "email": "juanma@example.com",
  "name": "Juan Manuel",
  "phone": "123-456-7890",
  "age": 23,
  "born": "2001-01-01T03:00:00.000Z",
  "appointments": [
    {
      "date": "2024-07-22",
      "time_range_id": 1,
      "doctor_id": "01a6c06f-ea0c-4094-a1f3-7cc7ac3aacdd",
      "status": "pending"
    },
    {
      "date": "2024-08-08",
      "time_range_id": 17,
      "doctor_id": "01a6c06f-ea0c-4094-a1f3-7cc7ac3aacdd",
      "status": "pending"
    },
    {
      "date": "2024-08-09",
      "time_range_id": 17,
      "doctor_id": "01a6c06f-ea0c-4094-a1f3-7cc7ac3aacdd",
      "status": "pending"
    },
    {
      "date": "2024-08-07",
      "time_range_id": 17,
      "doctor_id": "01a6c06f-ea0c-4094-a1f3-7cc7ac3aacdd",
      "status": "pending"
    }
  ]
};


function searchNearest(doctors, patient) {
  const currentDate = new Date();
  let day_id = (currentDate.getDay() + 1) % 7 + 1; // Starts from tomorrow

  let finded = false;
  let appointmentObject = {};
  const maxDaysToCheck = 7; // to prevent infinite loop
  let daysChecked = 0;

  while (!finded && daysChecked < maxDaysToCheck) {
    // Filter doctors who are available on the current day_id
    const availableDoctors = doctors.filter(doctor => doctor.weekly_availability[day_id]);
    const timeRanges = [];

    if (availableDoctors.length > 0) {
      availableDoctors.forEach(doctor => {
        // Push all time ranges into timeRanges
        doctor.weekly_availability[day_id].forEach(tm => {
          if (!timeRanges.includes(tm)) timeRanges.push(tm);
        });
      });

      // Iterate through all time ranges
      for (let i = 0; i < timeRanges.length; i++) {
        const currentTimeRange = timeRanges[i];

        // Check if the patient already has an appointment at the current date and time range
        const patHasAppointment = patient.appointments.some(appointment => {
          return appointment.date === currentDate.toISOString().split('T')[0] && appointment.time_range_id === currentTimeRange;
        });

        if (patHasAppointment) {
          continue; // Skip if the patient already has an appointment
        }

        availableDoctors.forEach(doctor => {
          if (!doctor.weekly_availability[day_id].includes(currentTimeRange)) return; // Skip if the time range is not available

          // Check if the doctor already has an appointment at the date and time range
          const docHasAppointment = doctor.appointments.some(appointment => {
            return appointment.day_id === day_id && appointment.time_range_id === currentTimeRange;
          });

          if (!docHasAppointment) {
            // If no appointment exists, set the appointment object and flag as found
            appointmentObject = {
              doctor_id: doctor.id,
              date: currentDate,
              time_range_id: currentTimeRange,
              patient_id: patient.id,
              status: 'pending'
            };
            finded = true;
          }
        });
      }
    }

    if (!finded) {
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      day_id = (day_id % 7) + 1;
      daysChecked++;
    }
  }

  if (!finded) {
    throw new Error('No available appointment found within the next 7 days');
  }

  return appointmentObject;
}

// Run the test
const result = searchNearest(docotrs, patient);
console.log(result);