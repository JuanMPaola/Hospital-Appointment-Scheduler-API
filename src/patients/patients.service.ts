import { Injectable } from '@nestjs/common';
import { PatientDto } from './dto/patient.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PatientsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(patient: PatientDto) {
    try {
      // Query to insert into users table (returns ID)
      const createUserQuery = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;

      // Extracting values from dto 
      const userValues = [
        patient.name,
        patient.email,
        patient.password,
        'patient'
      ];

      // Sending query and values to db
      const userResult = await this.databaseService.query(createUserQuery, userValues);
      const userId = userResult.rows[0].id;

      // Query to insert into patients table patientValues using the user_id
      const createPatientQuery = `
        INSERT INTO patients (user_id, age, phone, born)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      // Extracting values from dto
      const patientValues = [
        userId,
        patient.age,
        patient.phone,
        patient.born
      ];

      // Send the query and values to db
      const patientResult = await this.databaseService.query(createPatientQuery, patientValues);


      return patientResult.rows[0];

    } catch (error) {

      console.error('Error creating patient:', error);
      throw new Error('Could not create patient');
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

  async remove(id: string) {
    const query = 'DELETE FROM patient WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result.rows[0];
  }
}