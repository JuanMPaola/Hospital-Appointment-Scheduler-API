import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(doctor: DoctorDto) {
    try {
      // Insert into doctors table using the user_id
      const createDoctorQuery = `
        INSERT INTO doctors (user_id)
        VALUES ($1)
        RETURNING *;
      `;
    
      const doctorResult = await this.databaseService.query(createDoctorQuery, [doctor.id]);
      
      // Insert specialties into doctor_specialties table

      

      console.log(doctor)
      const insertSpecialtiesQuery = `
        INSERT INTO doctor_specialties (doctor_id, specialty_id)
        VALUES ${
          
          doctor.specialties.map((index) => `($1, $${index + 2})`).join(', ') //?
          
        }
        RETURNING *;
      `;
      await this.databaseService.query(insertSpecialtiesQuery, [doctor.id, doctor.specialties]);
      

      return doctorResult.rows[0];
    } catch (error) {
      console.log(error)
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
