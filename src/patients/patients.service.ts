import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { DatabaseService } from '../database/database.service';
import { createPatientQuery, getAllPaitentsQuery, getPatientByIdQuery } from './patients.querys';
import { deleteAppointmentsByUserIdQuery } from '../appoinments/appoinmetns.querys';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async create(patient: PatientDto) {
    try {
      // Extracting values from dto, and sending the query and values to db
      const patientValues = [
        patient.id,
        patient.age,
        patient.phone,
        patient.born
      ];
      // Send query and values
      const patientResult = await this.databaseService.query(createPatientQuery, patientValues);
      return patientResult.rows[0];
    } catch (error) {
      throw new Error('Could not create patient'), error;
    }
  }

  async findAll() {
    try {
      const result = await this.databaseService.query(getAllPaitentsQuery);
      return result.rows;      
    } catch (error) {
      throw new Error('Could not get patients'), error;
    }
  }

  async findOne(id: string) {
   try {
    const result = await this.databaseService.query(getPatientByIdQuery, [id]);
    return result.rows[0];    
   } catch (error) {
    throw new Error('Could not get patient'), error;
   }
  }

  
  async delete(userId: string) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
      
      // Get appointments - if there are any, delete them first
      await this.databaseService.query(deleteAppointmentsByUserIdQuery, [userId]);
      
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

  async update(patient: UpdatePatientDto) {
    try {
      await this.databaseService.query('BEGIN');

      // Update the patients table
      const patientQuery = `
        UPDATE patients
        SET age = $1, phone = $2, born = $3
        WHERE user_id = $4
        RETURNING *;
      `;
      const patientValues = [
        patient.age,
        patient.phone,
        patient.born,
        patient.id,
      ];
      const patientResult = await this.databaseService.query(patientQuery, patientValues);
  
      await this.databaseService.query('COMMIT');
      return { id: patient.id, email: patient.email, password: patient.password, ...patientResult.rows[0], };
    } catch (error) {
      await this.databaseService.query('ROLLBACK');
      throw new InternalServerErrorException('Could not update patient', error.message);
    }
  }  
}