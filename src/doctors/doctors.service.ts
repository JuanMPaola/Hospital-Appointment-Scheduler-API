import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DatabaseService } from '../database/database.service';
import { createDoctorQuery, deleteDoctorQuery, deleteDoctorSpecialtiesQuery, deleteDoctorWeeklyAvailability, findAllDoctorsQuery, findDoctorByIdQuery, findDoctorBySpecialtieQuery, findeDoctorsWeekAvailabilityAndAppointments } from './doctors.querys';
import { deleteAppointmentsByUserIdQuery} from '../appoinments/appoinmetns.querys';


@Injectable()
export class DoctorsService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async create(doctor: DoctorDto) {
    const doctorId = doctor.id;

    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
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
      const { week_availability } = doctor;
      if (week_availability) {
        const availabilityEntries = Object.entries(week_availability);
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
          INSERT INTO doctor_weekly_availability (doctor_id, day_id, time_range_id)
          VALUES ${valuesString}
          RETURNING *;
        `;
        // Insert the doctorId at the beginning of the valuesArray
        valuesArray.unshift(doctorId);
        await this.databaseService.query(insertAvailabilityQuery, valuesArray);
      } else {
        throw new Error("Week availability is undefined or null");
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
    try {
      const result = await this.databaseService.query(findAllDoctorsQuery);
      return result.rows;
    } catch (error) {
      throw new Error('Could not get all doctor'), error;
    }
  }


  async findOne(id: string) {
    try {
      const result = await this.databaseService.query(findDoctorByIdQuery, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not get all doctor'), error;
    }
  }


  async findBySpecialty(specialtyId: number) {
    try {
      const result = await this.databaseService.query(findDoctorBySpecialtieQuery, [specialtyId]);
      return result.rows;
    } catch (error) {
      throw new Error('Could not get doctors by specialtie'), error;
    }
  }


  async findAvailability(doctorId: string) {
    try {
      const result = await this.databaseService.query(findeDoctorsWeekAvailabilityAndAppointments, [doctorId]);
      return result.rows;
    } catch (error) {
      throw new Error('Could not get doctors week availability'), error;
    }
  }


  async delete(userId: string) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
      // Delete specialities
      await this.databaseService.query(deleteDoctorSpecialtiesQuery, [userId])
      // Delete weekly abailability
      await this.databaseService.query(deleteDoctorWeeklyAvailability, [userId])
      // Delete all doctor appointments
      await this.databaseService.query(deleteAppointmentsByUserIdQuery, [userId])
      // Delete from doctos table
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

  update(doctorDto: DoctorDto) {
    return ;
  }
}
