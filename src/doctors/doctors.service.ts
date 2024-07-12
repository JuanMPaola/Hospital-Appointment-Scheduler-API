import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(doctor: DoctorDto) {
    try {
      // Query to insert into users table (returns ID)
      const createUserQuery = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;
  
      // Extracting values from dto
      const userValues = [
        doctor.name,
        doctor.email,
        doctor.password,
        'doctor'
      ];
  
      // Sending query and values to db
      const userResult = await this.databaseService.query(createUserQuery, userValues);
      const userId = userResult.rows[0].id;
  
      // Insert into doctors table using the user_id
      const createDoctorQuery = `
        INSERT INTO doctors (user_id)
        VALUES ($1)
        RETURNING *;
      `;
  
      const doctorResult = await this.databaseService.query(createDoctorQuery, [userId]);
  
      return doctorResult.rows[0];
  
    } catch (error) {
      console.error('Error creating doctor:', error);
      throw new Error('Could not create doctor');
    }
  }

  async findAll() {
    const query = `
    SELECT * FROM doctor
    `

    const result = await this.databaseService.query(query);
    return result.rows[0];
  }

  async findOne(id: string) {
    const query = `
    SELECT * FROM doctor
    WHERE doctor.id = $1
    `

    const result = await this.databaseService.query(query, [id]);
    return result.rows[0];
  }

  update(id: number, doctorDto: DoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
