import { AppoinmentDto } from "./dto/appoinment.dto";

export function searchNearest(doctors, patient) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Starts from tomorrow
    let day_id = (currentDate.getDay() % 7) + 1; // Get day_id
    let found = false;
    let appointmentObject: AppoinmentDto;
    const maxDaysToCheck = 30; // to prevent infinite loop
    let daysChecked = 0;

    while (!found && daysChecked < maxDaysToCheck) {
      // Filter doctors who are available on the current day_id
      const availableDoctors = doctors.filter(
        (doctor) =>
          doctor.weekly_availability[day_id] &&
          doctor.weekly_availability[day_id].length > 0,
      );
      const timeRanges = new Set<number>();

      if (availableDoctors.length > 0) {
        availableDoctors.forEach((doctor) => {
          // Add all time ranges into timeRanges set
          doctor.weekly_availability[day_id].forEach((tm) => {
            timeRanges.add(tm);
          });
        });

        // Convert Set to Array and sort in ascending order
        const uniqueTimeRanges = Array.from(timeRanges).sort((a, b) => a - b);

        // Iterate through all unique time ranges
        for (let i = 0; i < uniqueTimeRanges.length; i++) {
          const currentTimeRange = uniqueTimeRanges[i];

          // Check if the patient already has an appointment at the current date and time range
          const patHasAppointment =
            patient.appointments &&
            patient.appointments.some((appointment) => {
              return (
                appointment.date === currentDate.toISOString().split('T')[0] &&
                appointment.time_range_id === currentTimeRange
              );
            });

          if (patHasAppointment) {
            continue; // Skip if the patient already has an appointment
          }

          for (const doctor of availableDoctors) {
            if (
              !doctor.weekly_availability[day_id] ||
              !doctor.weekly_availability[day_id].includes(currentTimeRange)
            )
              continue; // Skip if the time range is not available

            // Check if the doctor already has an appointment at the date and time range
            const docHasAppointment =
              doctor.appointments &&
              doctor.appointments.some((appointment) => {
                return (
                  appointment.day_id === day_id &&
                  appointment.time_range_id === currentTimeRange
                );
              });

            if (!docHasAppointment) {
              // If no appointment exists, set the appointment object and flag as found
              appointmentObject = {
                doctor_id: doctor.id,
                patient_id: patient.id,
                date: currentDate,
                time_range_id: currentTimeRange,
                status: 'pending',
              };
              found = true;
              break; // Exit the loop once an appointment is found
            }
          }

          if (found) break; // Exit the outer loop if an appointment is found
        }
      }

      if (!found) {
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        day_id = (day_id % 7) + 1;
        daysChecked++;
      }
    }

    if (!found) {
      throw new Error('No available appointment found within the next 30 days');
    }
    return appointmentObject;
  }

  export function getDayIdFromDate (date: Date): number {
    // Days of the week mapping to id
    const dayMapping = {
      0: 1, // Sunday
      1: 2, // Monday
      2: 3, // Tuesday
      3: 4, // Wednesday
      4: 5, // Thursday
      5: 6, // Friday
      6: 7, // Saturday
    };

    // Get the day index from the date (0 for Sunday, 1 for Monday, etc.)
    const dayIndex = date.getDay();

    return dayMapping[dayIndex];
  }