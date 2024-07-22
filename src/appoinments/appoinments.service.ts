import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppoinmentsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(appoinmentDto: AppoinmentDto) {
    try {
      // Search if doctor already have an appointment at that tame_range and date
      //const existingAppointment = await this.findSpecificAppointment(appoinmentDto);
      //if (existingAppointment) {
      //  throw new BadRequestException('Doctor is not available')
      //}

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

    } catch (error) {
      console.log("HELO")
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    // Query to bring all appointments 
    const bringAppointmentsQuery = `
    SELECT * FROM appointments
    `
    const result = await this.databaseService.query(bringAppointmentsQuery)

    return result.rows;
  }

  async findSpecificAppointment(appoinmentDto: AppoinmentDto) {
    try {
      const specificAppointmentQuery = `
      SELECT * FROM appointments
      WHERE doctor_id = ${appoinmentDto.doctor_id} AND date = ${appoinmentDto.date} AND time_range_id = ${appoinmentDto.time_range_id} 
      `
      const result = await this.databaseService.query(specificAppointmentQuery);
      return result.allrows[0];

    } catch (error) {
      
    }
  }

  update(id: number, updateAppoinmentDto: UpdateAppoinmentDto) {
    return `This action updates a #${id} appoinment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appoinment`;
  }
}
