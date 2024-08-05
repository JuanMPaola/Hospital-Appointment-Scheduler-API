import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { DatabaseService } from 'src/database/database.service';
import { ValidationService } from 'src/validation/validation.service';
import { bringAllAppointmentsQuery, createAppointmentQuery, findAppointmentsByUserIdQuery, deleteAppointmentsByUserIdQuery, updateAppointmentStatusQuery, updateAppointmentQuery, findSpecificAppointmentDoctorQuery, findSpecificAppointmentPatientQuery } from './appoinmetns.querys';
import { findDoctorBySpecialtiePlusAvailabilityQuery } from 'src/doctors/doctors.querys';

@Injectable()
export class AppoinmentsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly validationService: ValidationService
  ) { }

  async appointmentValidation(appoinmentDto: AppoinmentDto) {
    try {
      // Check if the doctor has an appointment at that time range and date
      const doctorAppointment = await this.findSpecificAppointmentDoctor(
        appoinmentDto.doctor_id,
        appoinmentDto.date,
        appoinmentDto.time_range_id
      );

      if (doctorAppointment) {
        throw new Error('Doctor is not available at the selected time');
      }

      // Check if the patient has an appointment at that time range and date
      const patientAppointment = await this.findSpecificAppointmentPatient(
        appoinmentDto.patient_id,
        appoinmentDto.date,
        appoinmentDto.time_range_id
      );

      if (patientAppointment) {
        throw new Error('Patient already has an appointment at the selected time');
      }

    } catch (error) {
      throw new InternalServerErrorException('Error during appointment validation: ' + error.message);
    }
  }

  async create(appoinmentDto: AppoinmentDto ) {
    try {
      const appointmentData = await this.appointmentValidation(appoinmentDto)
      //Extracting values from dto
      const appoinmentValues = [
        appoinmentDto.doctor_id,
        appoinmentDto.patient_id,
        appoinmentDto.time_range_id,
        appoinmentDto.date,
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
      // Get doctors by specialtie
      const doctors = await this.databaseService.query(findDoctorBySpecialtiePlusAvailabilityQuery, [specialtyId]);

      const nearestAppointment = await this.searchNearest(doctors.rows, patientId);

      const result = await this.create(nearestAppointment);
      
    } catch (error) {
      throw new InternalServerErrorException('Error finding nearest appointment', error.message);
    }
  }

  async searchNearest(doctors, patientId: string) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    let tomorrow_id = (currentDate.getDay() + 1) % 7 + 1; // Ensure tomorrow_id stays within 1-7
  
    let finded = false;
    let appointmentObject = new AppoinmentDto;
  
    while (!finded) {
      // Filter doctors who are available tomorrow
      const availableDoctors = doctors.filter(doctor => doctor.weekly_availability[tomorrow_id]);
  
      if (availableDoctors.length > 0) {
        // Sort doctors by their earliest availability time range for tomorrow
        availableDoctors.sort((a, b) => {
          const earliestTimeA = Math.min(...a.weekly_availability[tomorrow_id]);
          const earliestTimeB = Math.min(...b.weekly_availability[tomorrow_id]);
          return earliestTimeA - earliestTimeB;
        });
  
        for (const doctor of availableDoctors) {
          const earliestTime = Math.min(...doctor.weekly_availability[tomorrow_id]);
  
          // Check if the doctor has an appointment at that time on the specified day
          const appointmentDate = new Date(currentDate);
          appointmentDate.setDate(currentDate.getDate() + 1); // Set to tomorrow's date
  
          const existingAppointmentDoctor = await this.findSpecificAppointmentDoctor(
            doctor.id,
            appointmentDate,
            earliestTime
          );
  
          const existingAppointmentPatient = await this.findSpecificAppointmentPatient(
            patientId,
            appointmentDate,
            earliestTime
          );
  
          if (!existingAppointmentDoctor && !existingAppointmentPatient) {
            appointmentObject = {
              doctor_id: doctor.id,
              date: appointmentDate,
              time_range_id: earliestTime,
              patient_id: patientId,
              status: 'pending'
            };
            finded = true;
            break;
          }
        }
      }
  
      if (!finded) {
        tomorrow_id = (tomorrow_id % 7) + 1; // Move to the next day
      }
    }
  
    console.log("Available Doctor:", appointmentObject);
    return appointmentObject;
  }

  async findAll() {
    try {
      const result = await this.databaseService.query(bringAllAppointmentsQuery)
      return result.rows;
    } catch (error) {

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

  async deleteAllByDocOrPatientId(userId: string) {
    try {
      await this.databaseService.query(deleteAppointmentsByUserIdQuery, [userId]);
    } catch (error) {
      throw new Error('Could not delete appointments: ' + error.message);
    }
  }

  async updateStatus(id: string, status: string) {
    try {

      const result = await this.databaseService.query(updateAppointmentStatusQuery, [status, id]);

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
      const updateValues = [
        updateAppointmentDto.date,
        updateAppointmentDto.time_range_id,
        id
      ];

      const result = await this.databaseService.query(updateAppointmentQuery, updateValues);

      // If no result notify
      if (result.rowCount === 0) {
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
}
