import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { DatabaseService } from '../database/database.service';
import { createDoctorQuery, createInsertAvailabilityQuery, createInsertSpecialtiesQuery, deleteDoctorQuery, deleteDoctorSpecialtiesQuery, deleteDoctorWeeklyAvailability, findAllDoctorsQuery, findDoctorByIdQuery, findDoctorBySpecialtieQuery, findeDoctorsWeekAvailabilityAndAppointments } from './doctors.querys';
import { deleteAppointmentsByUserIdQuery } from '../appoinments/appoinmetns.querys';
import { UpdateDoctorDto } from './dto/update-doctor.dto';


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
      const insertSpecialtiesQuery = createInsertSpecialtiesQuery(doctor);
      await this.databaseService.query(insertSpecialtiesQuery, [doctorId, ...doctor.specialties]);

      // Insert availability into doctor_availability
      const { week_availability } = doctor;
      const { insertAvailabilityQuery, valuesArray } = createInsertAvailabilityQuery(week_availability, doctorId)
      await this.databaseService.query(insertAvailabilityQuery, valuesArray);

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
      throw new Error('Could not get doctor'), error;
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

  async update(doctor: UpdateDoctorDto) {
    try {
      // Start the transaction to ensure atomicity
      await this.databaseService.query('BEGIN');

      // Delete existing specialties for the doctor
      await this.databaseService.query(deleteDoctorSpecialtiesQuery, [doctor.id]);

      // Insert new specialties if provided
      if (doctor.specialties && doctor.specialties.length > 0) {
        const insertSpecialtiesQuery = createInsertSpecialtiesQuery(doctor);
        await this.databaseService.query(insertSpecialtiesQuery, [doctor.id, ...doctor.specialties]);
      }

      // Delete existing weekly availability for the doctor
      await this.databaseService.query(deleteDoctorWeeklyAvailability, [doctor.id]);

      // Insert new weekly availability if provided
      if (doctor.week_availability && Object.keys(doctor.week_availability).length > 0) {
        const { insertAvailabilityQuery, valuesArray } = createInsertAvailabilityQuery(doctor.week_availability, doctor.id);
        await this.databaseService.query(insertAvailabilityQuery, valuesArray);
      }

      // Commit the transaction
      await this.databaseService.query('COMMIT');

      // Return a success response or the updated doctor details, depending on your needs
      return { id: doctor.id, ...doctor };
    } catch (error) {
      // Rollback the transaction if an error occurs
      await this.databaseService.query('ROLLBACK');
      throw new InternalServerErrorException('Could not update doctor', error.message);
    }
  }
}
