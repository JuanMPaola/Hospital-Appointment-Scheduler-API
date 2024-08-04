import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { DatabaseService } from 'src/database/database.service';
import { ValidationService } from 'src/validation/validation.service';
import { bringAllAppointmentsQuery, createAppointmentQuery, findAppointmentsByUserIdQuery, findSpecificAppointmentQuery, deleteAppointmentsByUserIdQuery, updateAppointmentStatusQuery, updateAppointmentQuery } from './appoinmetns.querys';
import { findDoctorBySpecialtieQuery } from 'src/doctors/doctors.querys';

@Injectable()
export class AppoinmentsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly validationService: ValidationService
  ) { }

  async appointmentValidation(appoinmentDto: AppoinmentDto) {
    try {
      // Search if doctor already have an appointment at that tame_range and date
      const existingAppointment = await this.findSpecificAppointment(appoinmentDto);
      if (existingAppointment) {
        throw new BadRequestException('Doctor is not available')
      }


    } catch (error) {
      throw new InternalServerErrorException('Could not validate appointment', error.message);
    }
  }

  async create(appoinmentDto: AppoinmentDto) {
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

  async createNearest(specialtyId) {
    try {
      const doctors = await this.databaseService.query(findDoctorBySpecialtieQuery, [specialtyId]);

      const currentDate = new Date();

      const currentDay = currentDate.getDay(); // Returns the day of the week (0-6) where 0 is Sunday and 6 is Saturday
      const currentHour = currentDate.getHours(); // Returns the hour (0-23)

      // Optionally, you can convert the day to a string if you prefer
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayString = daysOfWeek[currentDay];

      console.log(`Current day: ${currentDayString}`);
      console.log(`Current hour: ${currentHour}`);

      console.log(specialtyId)

    } catch (error) {

    }
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

  async findSpecificAppointment(appoinmentDto: AppoinmentDto) {
    try {

      const appoinmentValues = [
        appoinmentDto.doctor_id,
        appoinmentDto.date,
        appoinmentDto.time_range_id,
      ];

      const result = await this.databaseService.query(findSpecificAppointmentQuery, appoinmentValues);
      // Return the first matching appointment if exists
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Error finding specific appointment: ' + error.message);
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

}
