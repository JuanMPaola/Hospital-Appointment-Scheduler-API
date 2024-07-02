import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(doctorDto: DoctorDto) {
    const query = `
    INSERT INTO doctor (name, email, username, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `

    const values = [
      doctorDto.name,
      doctorDto.email,
      doctorDto.username,
      doctorDto.password,
    ];

    const result = await this.databaseService.query(query,values);
    //PostgreSQL returns the rows that were inserted
    return result.rows[0]
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

    const result = await this.databaseService.query(query,[id]);
    return result.rows[0];
  }

  update(id: number, doctorDto: DoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
