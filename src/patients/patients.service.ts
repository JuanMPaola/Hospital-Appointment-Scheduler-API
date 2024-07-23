import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { DatabaseService } from '../database/database.service';
import { AppoinmentsService } from 'src/appoinments/appoinments.service';

@Injectable()
export class PatientsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly appointmentService: AppoinmentsService
  ) { }

  async create(patient: PatientDto) {
    try {
      // Query to insert data into patients table
      const createPatientQuery = `
        INSERT INTO patients (user_id, age, phone, born)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      // Extracting values from dto, and sending the query and values to db
      const patientValues = [
        patient.id,
        patient.age,
        patient.phone,
        patient.born
      ];
      const patientResult = await this.databaseService.query(createPatientQuery, patientValues);


      return patientResult.rows[0];

    } catch (error) {
      throw new Error('Could not create patient'), error;
    }
  }

  async findAll() {
    const query = 'SELECT * FROM patients';
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  async findOne(id: string) {
    const query = 'SELECT * FROM patient WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result.rows[0];
  }

  async update(id: string, patient: PatientDto) {
    const query = `
      UPDATE patient
      SET name = $1, age = $2, email = $3, phone = $4, born = $5, username = $6, password = $7
      WHERE id = $8
      RETURNING *;
    `;
    const values = [
      patient.name,
      patient.age,
      patient.email,
      patient.phone,
      patient.born,
      patient.password,
      id,
    ];
    const result = await this.databaseService.query(query, values);
    return result.rows[0];
  }

  async delete(userId: string) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
  
      // Get appointments - if there are any, delete them first
      await this.appointmentService.deleteAllByDocOrPatientId(userId);
  
      // Query to delete the patient
      const deletePatientQuery = `
        DELETE FROM patients 
        WHERE user_id = $1 
        RETURNING *;
      `;
      const result = await this.databaseService.query(deletePatientQuery, [userId]);
  
      if (result.rowCount === 0) {
        throw new NotFoundException(`Patient with user_id ${userId} not found`);
      }
  
      // End transaction
      await this.databaseService.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      // Rollback the transaction
      await this.databaseService.query('ROLLBACK');
      throw new Error('Could not delete patient: ' + error.message);
    }
  }
}