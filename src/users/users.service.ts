import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PatientDto } from '../patients/dto/patient.dto';
import { DoctorDto } from '../doctors/dto/doctor.dto';
import { DatabaseService } from '../database/database.service';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';
import {
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getByEmailQuery,
  getRoleQuery,
  getUserById,
  updateUserQuery,
} from './users.querys';
import { UpdatePatientDto } from 'src/patients/dto/update-patient.dto';
import { UpdateDoctorDto } from 'src/doctors/dto/update-doctor.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
  ) {}

  async create(user: PatientDto & DoctorDto) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
      // Extracting values from dto. Sending query and values to db
      const userValues = [user.name, user.email, user.password, user.role];
      const userResult = await this.databaseService.query(
        createUserQuery,
        userValues,
      );
      const userId = userResult.rows[0].id;
      // Adding the userId to patient/doctor dto and sending it to respective service
      if (user.role === 'patient') {
        const patient: PatientDto = {
          ...user,
          id: userId,
        };
        await this.patientsService.create(patient);
      } else if (user.role === 'doctor') {
        const doctor: DoctorDto = {
          ...user,
          id: userId,
        };
        await this.doctorsService.create(doctor);
      } else {
        throw new BadRequestException('Invalid role or role data');
      }
      // End transaction
      this.databaseService.query('COMMIT');
      return { id: userId, ...user };
    } catch (error) {
      // Rollback the transaction to not store user if something go wrong in doc/patient service
      await this.databaseService.query('ROLLBACK');
      throw new InternalServerErrorException(
        'Could not create user',
        error.message,
      );
    }
  }

  async findAll() {
    try {
      const result = await this.databaseService.query(getAllUsersQuery);
      return result.rows;
    } catch (error) {
      throw (new Error('Could not get all users'), error);
    }
  }

  async findById(id: string) {
    try {
      const result = await this.databaseService.query(getUserById, [id]);
      return result.rows[0];
    } catch (error) {
      throw (new Error('Could not find user by id'), error);
    }
  }

  async update(id: string, userPatch: UpdatePatientDto & UpdateDoctorDto) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
      // Get the user
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const userValues = [
        userPatch.name,
        userPatch.email,
        userPatch.password,
        id,
      ];
      // Update user table
      await this.databaseService.query(updateUserQuery, userValues);

      // Update patient or doctor details based on role
      if (user.role === 'patient') {
        const patientDto: UpdatePatientDto = {
          ...userPatch,
          id,
        };
        await this.patientsService.update(patientDto);
      } else if (user.role === 'doctor') {
        const doctorDto: UpdateDoctorDto = {
          ...userPatch,
          id,
        };
        await this.doctorsService.update(doctorDto);
      } else {
        throw new BadRequestException('Invalid role or role data');
      }
      // Commit the transaction
      await this.databaseService.query('COMMIT');
      return { id, ...userPatch };
    } catch (error) {
      // Rollback the transaction if something goes wrong
      await this.databaseService.query('ROLLBACK');
      throw new InternalServerErrorException(
        'Could not update user',
        error.message,
      );
    }
  }

  async delete(id: string) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
      // Get if user is pacient or doctor
      const role = await this.getRole(id);
      // First delete the doc/patient part
      if (role === 'patient') {
        await this.patientsService.delete(id);
      } else if (role === 'doctor') {
        await this.doctorsService.delete(id);
      }
      const result = await this.databaseService.query(deleteUserQuery, [id]);
      // End transaction
      this.databaseService.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      // Rollback the transaction
      await this.databaseService.query('ROLLBACK');
      throw new Error('Could not delete user: ' + error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const result = await this.databaseService.query(getByEmailQuery, [email]);
      return result.rows[0];
    } catch (error) {
      throw (new Error('Error searching user by email'), error);
    }
  }

  async getRole(id: string) {
    try {
      const result = await this.databaseService.query(getRoleQuery, [id]);
      console.log(result.rows[0]);
      return result.rows[0].role;
    } catch (error) {
      throw (new Error('Error geting user role'), error);
    }
  }
}
