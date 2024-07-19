import { Injectable } from '@nestjs/common';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppoinmentsService {
  constructor (private readonly databaseService: DatabaseService) {}

  async create(appoinmentDto: AppoinmentDto) {
    // Query to insert data into appointment table
    const createAppointmentQuery = `
    INSERT INTO appointments (doctor_id, patient_id, date, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `
    //Extracting values from dto
    const appoinmentValues = [
      appoinmentDto.doctor_id,
      appoinmentDto.patient_id,
      appoinmentDto.date,
      appoinmentDto.status
    ]

    console.log(appoinmentValues)
    // Send the query and values to db
    const appoinmentResult = await this.databaseService.query(createAppointmentQuery, appoinmentValues)
    
    return appoinmentResult.rows[0];
  }

  async findAll() {
    // Query to bring all appointments 
    const bringAppointmentsQuery =`
    SELECT * FROM appointments
    `
    const result = await this.databaseService.query(bringAppointmentsQuery)

    return result.rows;
  }

  findOne(id: number) {
    return `This action returns a #${id} appoinment`;
  }

  update(id: number, updateAppoinmentDto: UpdateAppoinmentDto) {
    return `This action updates a #${id} appoinment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appoinment`;
  }
}
