import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppoinmentsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(appoinmentDto: AppoinmentDto) {
    try {
      // Search if doctor already have an appointment at that tame_range and date
      const existingAppointment = await this.findSpecificAppointment(appoinmentDto);
      if (existingAppointment) {
        throw new BadRequestException('Doctor is not available')
      }else{

        
        // Query to insert data into appointment table
        const createAppointmentQuery = `
        INSERT INTO appointments (doctor_id, patient_id, time_range_id, date, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `
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
        
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    // Create and send the query 
    const bringAppointmentsQuery = `
    SELECT * FROM appointments
    `
    const result = await this.databaseService.query(bringAppointmentsQuery)
    return result.rows;
  }

  async findAllByUserId(userId: string) {
    try {
      // Create and send the query
      const findAppointmentsQuery = `
        SELECT * FROM appointments
        WHERE patient_id = $1 OR doctor_id = $1
      `;
      const result = await this.databaseService.query(findAppointmentsQuery, [userId]);
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve appointments: ' + error.message);
    }
  }

  async findSpecificAppointment(appoinmentDto: AppoinmentDto) {
    try {
      // Create and send the query
      const specificAppointmentQuery = `
        SELECT * FROM appointments
        WHERE doctor_id = $1 AND date = $2 AND time_range_id = $3
      `;
      const appoinmentValues = [
        appoinmentDto.doctor_id,
        appoinmentDto.date,
        appoinmentDto.time_range_id,
      ];

      const result = await this.databaseService.query(specificAppointmentQuery, appoinmentValues);
      // Return the first matching appointment if exists
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Error finding specific appointment: ' + error.message);
    }
  }

  async deleteAllByDocOrPatientId(userId: string) {
    try {
      // Create and send the query
      const deleteAppointmentsQuery = `
        DELETE FROM appointments
        WHERE patient_id = $1 OR doctor_id = $1;
      `;
      await this.databaseService.query(deleteAppointmentsQuery, [userId]);
    } catch (error) {
      throw new Error('Could not delete appointments: ' + error.message);
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      // Create and send the query
      const updateStatusQuery = `
        UPDATE appointments
        SET status = $1
        WHERE id = $2
        RETURNING *;
      `;
      const result = await this.databaseService.query(updateStatusQuery, [status, id]);

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
      // Create and send the query
      const updateAppointmentQuery = `
        UPDATE appointments
        SET date = $1, time_range_id = $2
        WHERE id = $3
        RETURNING *;
      `;
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
