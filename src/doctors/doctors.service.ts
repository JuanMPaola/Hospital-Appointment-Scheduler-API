import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DatabaseService } from 'src/database/database.service';
import { AppoinmentsService } from 'src/appoinments/appoinments.service';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly appointmentService: AppoinmentsService
  ) { }

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
    SELECT 
    u.id, 
    u.name, 
    u.email, 
    COALESCE(json_agg(s.title),'[]') AS specialties 
    FROM users u 
    JOIN doctor_specialties ds ON u.id = ds.doctor_id
    JOIN specialties s ON ds.specialty_id = s.id
    WHERE u.id IN (SELECT user_id FROM doctors)
    GROUP BY u.id, u.name, u.email;
    `
    const result = await this.databaseService.query(query);
    return result.rows;
  }


  async findOne(id: string) {
    const query = `
      SELECT 
          u.name,
          u.email,
          array_agg(DISTINCT ds.specialty_id) AS specialties,
          json_agg(DISTINCT jsonb_build_object(
              'day', da.day_id,
              'time_range', da.time_range_id
          )) AS availability
      FROM 
          users u
      JOIN 
          doctors d ON u.id = d.user_id
      JOIN 
          doctor_specialties ds ON d.user_id = ds.doctor_id
      LEFT JOIN 
          doctor_availability da ON d.user_id = da.doctor_id
      WHERE 
          u.id = $1
      GROUP BY 
          u.id
      `
    const result = await this.databaseService.query(query, [id]);
    return result.rows[0];
  }


  async findBySpecialty(specialtyId: number) {
    const query = `
      SELECT 
          u.id,
          u.name,
          u.email
      FROM users u
      JOIN doctors d ON u.id = d.user_id
      JOIN doctor_specialties ds ON d.user_id = ds.doctor_id
      WHERE ds.specialty_id = $1
      GROUP BY u.id;
    `;
    const result = await this.databaseService.query(query, [specialtyId]);
    return result.rows;
  }


  async findAvailability(doctorId: string) {
    const query = `
      SELECT jsonb_object_agg(
               day_id,
               time_ranges
             ) AS availability
      FROM (
          SELECT
              da.day_id,
              array_agg(da.time_range_id ORDER BY da.time_range_id) AS time_ranges
          FROM doctor_availability da
          WHERE da.doctor_id = $1
          GROUP BY da.day_id
      ) subquery;
    `;
    const result = await this.databaseService.query(query, [doctorId]);
    return result.rows;
  }
  

  async delete(userId: string) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');

      // Delete specialities
      const deleteDoctorSpecialtiesQuery = `
        DELETE FROM doctor_specialties
        WHERE doctor_id = $1;
      `
      await this.databaseService.query(deleteDoctorSpecialtiesQuery, [userId])

      // Delete abailability
      const deleteDoctorAvailability = `
      DELETE FROM doctor_availability
      WHERE doctor_id = $1;
      `
      await this.databaseService.query(deleteDoctorAvailability, [userId])
      
      // Get appointments - if there are not, can delete the doctor
      await this.appointmentService.deleteAllByDocOrPatientId(userId);

      // Delete from doctos table
      const deleteDoctorQuery = `
      DELETE FROM doctors
      WHERE user_id = $1
      RETURNING *;
      `;
      const result = await this.databaseService.query(deleteDoctorQuery, [userId])


      // End transaction
      await this.databaseService.query('COMMIT');
      return result.rows[0];

    } catch (error) {

      // Rollback the transaction
      await this.databaseService.query('ROLLBACK');
      throw new Error('Could not delete doctor: ' + error.message);
    }
  }
  

  update(id: number, doctorDto: DoctorDto) {
    return `This action updates a #${id} doctor`;
  }
}
