import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(doctor: DoctorDto) {
    const doctorId = doctor.id;

    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');

      // Insert into doctors table using the user_id
      const createDoctorQuery = `
        INSERT INTO doctors (user_id)
        VALUES ($1)
        RETURNING *;
      `;
      const doctorResult = await this.databaseService.query(createDoctorQuery, [doctorId]);


      // Insert specialties into doctor_specialties table
      const insertSpecialtiesQuery = `
        INSERT INTO doctor_specialties (doctor_id, specialty_id)
        VALUES ${doctor.specialties.map((_, index) => `($1, $${index + 2})`).join(', ')
        }
        RETURNING *;
      `;
      await this.databaseService.query(insertSpecialtiesQuery, [doctorId, ...doctor.specialties]);


      // Insert availability into doctor_availability
      const { availability } = doctor;
      if (availability) {
        const availabilityEntries = Object.entries(availability);

        const valuesArray: any[] = [];
        let valuesString = '';
        availabilityEntries.forEach(([dayId, timeRanges]) => {
          timeRanges.forEach((timeRangeId) => {
            valuesString += `($1, $${valuesArray.length + 2}, $${valuesArray.length + 3}), `;
            valuesArray.push(dayId, timeRangeId);
          });
        });

        // Remove the trailing comma and space
        valuesString = valuesString.slice(0, -2);

        const insertAvailabilityQuery = `
          INSERT INTO doctor_availability (doctor_id, day_id, time_range_id)
          VALUES ${valuesString}
          RETURNING *;
        `;

        // Insert the doctorId at the beginning of the valuesArray
        valuesArray.unshift(doctorId);

        await this.databaseService.query(insertAvailabilityQuery, valuesArray);
      } else {
        throw new Error("Availability is undefined or null");
      }

      // End transaction
      this.databaseService.query('COMMIT');
      return doctorResult.rows[0];

    } catch (error) {

      // Rollback the transaction to not store info is something go wrong in one of the querys
      await this.databaseService.query('ROLLBACK');
      throw new Error('Could not create doctor'), error;
    }
  }


  async findAll() {
    const query = `
    SELECT * FROM doctors
      `

    const result = await this.databaseService.query(query);
    return result.rows[0];
  }


  async findOne(id: string) {
    const query = `
    SELECT * FROM doctors
    WHERE doctor.id = $1
      `

    const result = await this.databaseService.query(query, [id]);
    return result.rows[0];
  }


  update(id: number, doctorDto: DoctorDto) {
    return `This action updates a #${id} doctor`;
  }


  delete(id: string) {
    return `This action removes a #${id} doctor`;
  }
}
