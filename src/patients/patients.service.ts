import { Injectable } from '@nestjs/common';
import { Patient } from './dto/patient.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PatientsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(patient: Patient) {
    const query = `
      INSERT INTO patient (name, age, email, phone, born, username, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      patient.name,
      patient.age,
      patient.email,
      patient.phone,
      patient.born,
      patient.username,
      patient.password,
    ];
    const result = await this.databaseService.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const query = 'SELECT * FROM patient';
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  async findOne(id: string) {
    const query = 'SELECT * FROM patient WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result.rows[0];
  }

  async update(id: string, patient: Patient) {
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
      patient.username,
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