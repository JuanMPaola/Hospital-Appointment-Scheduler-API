import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { DatabaseService } from 'src/database/database.service';
import { bringAllAppointmentsQuery, createAppointmentQuery, findAppointmentsByUserIdQuery, deleteAppointmentsByUserIdQuery, updateAppointmentStatusQuery, updateAppointmentQuery, findSpecificAppointmentDoctorQuery, findSpecificAppointmentPatientQuery, deleteAppointmentById } from './appoinmetns.querys';
import { findAllDoctorDataBySpecialityQuery, findeDoctorsWeekAvailabilityAndAppointments } from 'src/doctors/doctors.querys';
import { getPatientByIdQuery } from 'src/patients/patients.querys';

@Injectable()
export class AppoinmentsService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async create(appoinmentDto: AppoinmentDto) {
    try {
      await this.appointmentValidation(appoinmentDto)

      const dateObject = new Date(appoinmentDto.date);
      //Extracting values from dto
      const appoinmentValues = [
        appoinmentDto.doctor_id,
        appoinmentDto.patient_id,
        appoinmentDto.date,
        this.getDayIdFromDate(dateObject),
        appoinmentDto.time_range_id,
        appoinmentDto.status
      ]

      // Send the query and values to db
      const appoinmentResult = await this.databaseService.query(createAppointmentQuery, appoinmentValues)
      return appoinmentResult.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Could not create appointment', error.message);
    }
  }

  async createNearest(specialtyId: number, patientId: string) {
    try {
      // Get patient info
      const patient = await this.databaseService.query(getPatientByIdQuery, [patientId]);
      if (!patient.rows[0]) {
        throw new Error('Missing patient')
      }
      // Get doctors by specialtie
      const doctors = await this.databaseService.query(findAllDoctorDataBySpecialityQuery, [specialtyId]);
      if (doctors.rows.length === 0) {
        return new InternalServerErrorException('There are no doctors of that speciality available')
      }
      const nearestAppointment = await this.searchNearest(doctors.rows, patient.rows[0]);

      return this.create(nearestAppointment);

    } catch (error) {
      throw new InternalServerErrorException('Error creating nearest appointment', error.message);
    }
  }

  async findAll() {
    try {
      const result = await this.databaseService.query(bringAllAppointmentsQuery)
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve appointments: ' + error.message);
    }
  }

  async findAllByUserId(userId: string) {
    try {
      const result = await this.databaseService.query(findAppointmentsByUserIdQuery, [userId]);
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve appointments: ' + error.message);
    }
  }

  async delete(appointmentId: number){
    try {
      const result = await this.databaseService.query(deleteAppointmentById, [appointmentId]);
      return result.rows[0];
    } catch (error) {
      throw Error('Could not delete appointment')
    }
  }

  async deleteAllByDocOrPatientId(userId: string) {
    try {
      await this.databaseService.query(deleteAppointmentsByUserIdQuery, [userId]);
    } catch (error) {
      throw new Error('Could not delete appointments: ' + error.message);
    }
  }

  async cancel(id: string) {
    try {

      const result = await this.databaseService.query(updateAppointmentStatusQuery, [id]);

      // If no result notify
      if (result.rowCount === 0) {
        throw new NotFoundException(`Appointment with id ${id} not found`);
      }

      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Could not update appointment status: ' + error.message);
    }
  }

  async update(id: string, updateAppointmentDto: UpdateAppoinmentDto) {
    try {
      //Validate info
      await this.appointmentValidation(updateAppointmentDto);      
      const dateObject = new Date(updateAppointmentDto.date);
      //Extracting values from dto
      const updateValues = [
        updateAppointmentDto.doctor_id,
        updateAppointmentDto.date,
        this.getDayIdFromDate(dateObject),
        updateAppointmentDto.time_range_id,
        id
      ];
      const result = await this.databaseService.query(updateAppointmentQuery, updateValues);
      // If no result notify
      if (result.rows.length === 0) {
        throw new NotFoundException(`Appointment with id ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Could not update appointment: ' + error.message);
    }
  }

  async findSpecificAppointmentPatient(patient_id: string, date: Date, time_range_id: number) {
    try {
      const appointmentValues = [
        patient_id,
        date,
        time_range_id,
      ];

      const result = await this.databaseService.query(findSpecificAppointmentPatientQuery, appointmentValues);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Error finding specific appointment for patient: ' + error.message);
    }
  }

  async findSpecificAppointmentDoctor(doctor_id: string, date: Date, time_range_id: number) {
    try {
      const appointmentValues = [
        doctor_id,
        date,
        time_range_id,
      ];

      const result = await this.databaseService.query(findSpecificAppointmentDoctorQuery, appointmentValues);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Error finding specific appointment for doctor: ' + error.message);
    }
  }

  async appointmentValidation(appoinmentDto: AppoinmentDto | UpdateAppoinmentDto) {
    try {
      // If date is today or before, send error
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Convert appoinmentDto.date to a Date object if it's not already
      const dateObject = new Date(appoinmentDto.date);

      if (dateObject <= today) {
        throw new Error('Appointment must be tomorrow or later');
      }

      // Check if doctor is available at that time range
      const doctorData = await this.databaseService.query(findeDoctorsWeekAvailabilityAndAppointments, [appoinmentDto.doctor_id]);

      const { weekly_availability, appointments } = doctorData.rows[0];

      // Get dayId and time range
      const dayId = this.getDayIdFromDate(dateObject);
      const timeRangeId = appoinmentDto.time_range_id;

      // Check if the doctor works on the selected day and time range
      const availableTimeRanges = weekly_availability[dayId];
      if (!availableTimeRanges || !availableTimeRanges.includes(timeRangeId)) {
        throw new Error('Doctor is not available at the selected day and time');
      }

      // Check if the doctor already has an appointment at the selected time range and date
      const conflictingAppointment = appointments.find(
        (appointment) =>
          new Date(appointment.date).toDateString() === dateObject.toDateString() &&
          appointment.time_range_id === timeRangeId
      );

      if (conflictingAppointment) {
        throw new Error('Doctor already has an appointment at the selected time');
      }

      // Check if the patient has an appointment at that time range and date
      const patientAppointment = await this.findSpecificAppointmentPatient(
        appoinmentDto.patient_id,
        dateObject,
        appoinmentDto.time_range_id
      );

      if (patientAppointment) {
        throw new Error('Patient already has an appointment at the selected time');
      }

    } catch (error) {
      throw new InternalServerErrorException('Error during appointment validation: ' + error.message);
    }
  }


  async searchNearest(doctors, patient) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);  // Starts from tomorrow
    let day_id = (currentDate.getDay()) % 7 + 1;     // Get day_id
    let found = false;
    let appointmentObject: AppoinmentDto;
    const maxDaysToCheck = 30; // to prevent infinite loop
    let daysChecked = 0;

    while (!found && daysChecked < maxDaysToCheck) {
      // Filter doctors who are available on the current day_id
      const availableDoctors = doctors.filter(doctor => doctor.weekly_availability[day_id] && doctor.weekly_availability[day_id].length > 0);
      const timeRanges = new Set<number>();

      if (availableDoctors.length > 0) {
        availableDoctors.forEach(doctor => {
          // Add all time ranges into timeRanges set
          doctor.weekly_availability[day_id].forEach(tm => {
            timeRanges.add(tm);
          });
        });

        // Convert Set to Array and sort in ascending order
        const uniqueTimeRanges = Array.from(timeRanges).sort((a, b) => a - b);

        // Iterate through all unique time ranges
        for (let i = 0; i < uniqueTimeRanges.length; i++) {
          const currentTimeRange = uniqueTimeRanges[i];

          // Check if the patient already has an appointment at the current date and time range
          const patHasAppointment = patient.appointments && patient.appointments.some(appointment => {
            return appointment.date === currentDate.toISOString().split('T')[0] && appointment.time_range_id === currentTimeRange;
          });

          if (patHasAppointment) {
            continue; // Skip if the patient already has an appointment
          }

          for (const doctor of availableDoctors) {
            if (!doctor.weekly_availability[day_id] || !doctor.weekly_availability[day_id].includes(currentTimeRange)) continue; // Skip if the time range is not available

            // Check if the doctor already has an appointment at the date and time range
            const docHasAppointment = doctor.appointments && doctor.appointments.some(appointment => {
              return appointment.day_id === day_id && appointment.time_range_id === currentTimeRange;
            });

            if (!docHasAppointment) {
              // If no appointment exists, set the appointment object and flag as found
              appointmentObject = {
                doctor_id: doctor.id,
                patient_id: patient.id,
                date: currentDate,
                time_range_id: currentTimeRange,
                status: 'pending'
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

  getDayIdFromDate(date: Date): number {
    // Days of the week mapping to id
    const dayMapping = {
      0: 1, // Sunday
      1: 2, // Monday
      2: 3, // Tuesday
      3: 4, // Wednesday
      4: 5, // Thursday
      5: 6, // Friday
      6: 7  // Saturday
    };

    // Get the day index from the date (0 for Sunday, 1 for Monday, etc.)
    const dayIndex = date.getDay();

    return dayMapping[dayIndex];
  }
}
